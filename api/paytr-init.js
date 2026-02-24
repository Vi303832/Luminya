/**
 * PayTR iFrame Token API
 * POST /api/paytr-init
 * Header: Authorization: Bearer <Firebase ID Token>
 * Header: Idempotency-Key: <unique key> (opsiyonel, çift tıklama önleme)
 * Body: { orderId, items, total, email, userName, userPhone }
 */

import crypto from 'crypto';
import { getFirebaseAdmin } from './lib/firebase.js';
import { validatePaytrInit, validateIdempotencyKey } from './lib/validation.js';
import { checkRateLimit } from './lib/rateLimit.js';
import { getCachedResponse, createProcessing, saveResponse } from './lib/idempotency.js';

const PAYTR_URL = 'https://www.paytr.com/odeme/api/get-token';

async function verifyAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'Unauthorized', status: 401 };
  }
  const token = authHeader.slice(7);
  try {
    const admin = getFirebaseAdmin();
    const decoded = await admin.auth().verifyIdToken(token);
    return { uid: decoded.uid, email: decoded.email };
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return { error: 'Geçersiz veya süresi dolmuş oturum', status: 401 };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rateLimit = await checkRateLimit(req);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'Çok fazla istek. Lütfen 1 dakika sonra tekrar deneyin.' });
  }

  const auth = await verifyAuth(req);
  if (auth.error) {
    return res.status(auth.status || 401).json({ error: auth.error });
  }
  const { uid, email: tokenEmail } = auth;

  const idempotencyKey = req.headers['idempotency-key'];
  const keyValidation = validateIdempotencyKey(idempotencyKey);
  if (keyValidation.error && idempotencyKey) {
    return res.status(400).json({ error: keyValidation.error });
  }
  const idemKey = keyValidation.data;

  if (idemKey) {
    const cached = await getCachedResponse(idemKey, uid);
    if (cached?.error) {
      return res.status(cached.status).json({ error: cached.error });
    }
    if (cached?.cached) {
      return res.status(cached.statusCode).json(cached.response);
    }
  }

  const validation = validatePaytrInit(req.body);
  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }
  const { items, total, email, userName, userPhone } = validation.data;

  if (email !== tokenEmail) {
    return res.status(403).json({ error: 'E-posta eşleşmiyor' });
  }

  if (!idemKey) {
    return res.status(400).json({ error: 'Idempotency-Key header gerekli' });
  }

  const created = await createProcessing(idemKey, uid);
  if (!created.created) {
    return res.status(409).json({ error: 'İşlem zaten devam ediyor. Lütfen bekleyin.' });
  }

  const merchantId = process.env.PAYTR_MERCHANT_ID;
  const merchantKey = process.env.PAYTR_MERCHANT_KEY;
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT;
  // Kullanıcının bulunduğu siteye yönlendir (Origin) - env değişkenlerine güvenme
  const origin = req.headers.origin || req.headers.referer;
  let baseUrl = process.env.SITE_URL || 'https://luminyaspa.com.tr';
  if (origin) {
    try {
      const u = new URL(origin.startsWith('http') ? origin : `https://${origin}`);
      baseUrl = `${u.protocol}//${u.host}`;
    } catch (_) {}
  }

  if (!merchantId || !merchantKey || !merchantSalt) {
    return res.status(500).json({ error: 'PayTR credentials not configured' });
  }

  try {
    const admin = getFirebaseAdmin();
    const db = admin.firestore();
    const ordersRef = db.collection('orders');
    const orderData = {
      userId: uid,
      items,
      total,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const orderRef = await ordersRef.add(orderData);
    const orderId = orderRef.id;

    const expectedTotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    if (Math.abs(expectedTotal - total) > 0.01) {
      await orderRef.delete();
      return res.status(400).json({ error: 'Sipariş tutarı tutarsız' });
    }

    const userIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.headers['x-real-ip'] || '127.0.0.1';
    const paymentAmount = Math.round(total * 100);
    const merchantOid = orderId;
    const noInstallment = '0';
    const maxInstallment = '0';
    const currency = 'TL';
    const testMode = process.env.PAYTR_TEST_MODE || '1';

    const userBasket = Buffer.from(
      JSON.stringify(
        items.map((i) => [i.title, (i.price * i.quantity).toFixed(2), i.quantity])
      )
    ).toString('base64');

    const hashStr =
      merchantId +
      userIp +
      merchantOid +
      email +
      paymentAmount +
      userBasket +
      noInstallment +
      maxInstallment +
      currency +
      testMode +
      merchantSalt;

    const paytrToken = crypto
      .createHmac('sha256', merchantKey)
      .update(hashStr)
      .digest('base64');

    const merchantOkUrl = `${baseUrl}/payment/success`;
    const merchantFailUrl = `${baseUrl}/payment/failed`;

    const params = new URLSearchParams({
      merchant_id: merchantId,
      user_ip: userIp,
      merchant_oid: merchantOid,
      email,
      payment_amount: String(paymentAmount),
      paytr_token: paytrToken,
      user_basket: userBasket,
      debug_on: '1',
      no_installment: noInstallment,
      max_installment: maxInstallment,
      user_name: userName || '',
      user_address: 'Luminya Wellness',
      user_phone: userPhone || '',
      merchant_ok_url: merchantOkUrl,
      merchant_fail_url: merchantFailUrl,
      timeout_limit: '30',
      currency,
      test_mode: testMode,
      lang: 'tr'
    });

    const response = await fetch(PAYTR_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    const data = await response.json();

    if (data.status === 'success') {
      const responseBody = { token: data.token };
      if (idemKey) {
        await saveResponse(idemKey, responseBody, 200);
      }
      return res.status(200).json(responseBody);
    }

    const errMsg = data.reason || 'PayTR token failed';
    if (idemKey) {
      await saveResponse(idemKey, { error: errMsg }, 400);
    }
    return res.status(400).json({ error: errMsg });
  } catch (err) {
    console.error('PayTR init error:', err);
    return res.status(500).json({ error: 'Payment initialization failed' });
  }
}
