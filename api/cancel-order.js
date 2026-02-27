/**
 * Bekleyen siparişi iptal et
 * POST /api/cancel-order
 * Body: { orderId }
 * Header: Authorization: Bearer <Firebase ID Token>
 */

import { getFirebaseAdmin } from './lib/firebase.js';

async function verifyAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'Unauthorized', status: 401 };
  }
  const token = authHeader.slice(7);
  try {
    const admin = getFirebaseAdmin();
    const decoded = await admin.auth().verifyIdToken(token);
    return { uid: decoded.uid };
  } catch (err) {
    return { error: 'Geçersiz veya süresi dolmuş oturum', status: 401 };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = await verifyAuth(req);
  if (auth.error) {
    return res.status(auth.status || 401).json({ error: auth.error });
  }

  const orderId = req.body?.orderId;
  if (!orderId || typeof orderId !== 'string') {
    return res.status(400).json({ error: 'orderId gerekli' });
  }

  try {
    const admin = getFirebaseAdmin();
    const db = admin.firestore();
    const orderRef = db.collection('orders').doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return res.status(404).json({ error: 'Sipariş bulunamadı' });
    }

    const order = orderDoc.data();
    if (order.userId !== auth.uid) {
      return res.status(403).json({ error: 'Bu siparişe erişim yetkiniz yok' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Sadece bekleyen siparişler iptal edilebilir' });
    }

    await orderRef.delete();

    return res.status(200).json({ ok: true, message: 'Sipariş silindi' });
  } catch (err) {
    console.error('Cancel order error:', err);
    return res.status(500).json({ error: 'İptal işlemi başarısız' });
  }
}
