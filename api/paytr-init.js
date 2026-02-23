/**
 * PayTR iFrame Token API
 * POST /api/paytr-init
 * Body: { orderId, items, total, email, userName, userPhone }
 */

import crypto from 'crypto';

const PAYTR_URL = 'https://www.paytr.com/odeme/api/get-token';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const merchantId = process.env.PAYTR_MERCHANT_ID;
  const merchantKey = process.env.PAYTR_MERCHANT_KEY;
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT;
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.SITE_URL || 'https://luminya.com';

  if (!merchantId || !merchantKey || !merchantSalt) {
    return res.status(500).json({ error: 'PayTR credentials not configured' });
  }

  try {
    const { orderId, items, total, email, userName, userPhone } = req.body;

    if (!orderId || !items?.length || total == null || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
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
      return res.status(200).json({ token: data.token });
    }

    return res.status(400).json({ error: data.reason || 'PayTR token failed' });
  } catch (err) {
    console.error('PayTR init error:', err);
    return res.status(500).json({ error: 'Payment initialization failed' });
  }
}
