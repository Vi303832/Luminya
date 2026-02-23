/**
 * PayTR Bildirim URL - Ödeme sonucu callback
 * PayTR Mağaza Paneli > Ayarlar > Bildirim URL: https://siteniz.com/api/paytr-callback
 * Bu endpoint'e erişim kısıtlaması OLMAMALI (oturum vb. kullanılmaz)
 */

import crypto from 'crypto';
import admin from 'firebase-admin';

function getFirestore() {
  if (!admin.apps.length) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!serviceAccount) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON not configured');
    }
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccount))
    });
  }
  return admin.firestore();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const merchantKey = process.env.PAYTR_MERCHANT_KEY;
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT;

  if (!merchantKey || !merchantSalt) {
    console.error('PayTR callback: credentials missing');
    return res.status(500).send('OK');
  }

  const { merchant_oid, status, total_amount, hash } = req.body;

  if (!merchant_oid || !status || !hash) {
    return res.status(400).send('OK');
  }

  const hashStr = merchant_oid + merchantSalt + status + total_amount;
  const expectedHash = crypto
    .createHmac('sha256', merchantKey)
    .update(hashStr)
    .digest('base64');

  if (hash !== expectedHash) {
    console.error('PayTR callback: hash mismatch');
    return res.status(400).send('PAYTR notification failed: bad hash');
  }

  try {
    const db = getFirestore();
    const orderRef = db.collection('orders').doc(merchant_oid);

    const orderDoc = await orderRef.get();
    if (!orderDoc.exists) {
      return res.send('OK');
    }

    const order = orderDoc.data();
    if (order.status === 'paid' || order.status === 'cancelled' || order.status === 'failed') {
      return res.send('OK');
    }

    const newStatus = status === 'success' ? 'paid' : 'failed';
    await orderRef.update({
      status: newStatus,
      paytrTotalAmount: status === 'success' ? parseInt(total_amount, 10) : null,
      failedReasonCode: req.body.failed_reason_code || null,
      failedReasonMsg: req.body.failed_reason_msg || null,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  } catch (err) {
    console.error('PayTR callback Firestore error:', err);
  }

  return res.send('OK');
}
