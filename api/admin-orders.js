/**
 * Admin sipariş listesi - users koleksiyonundan müşteri bilgilerini birleştirir
 * GET /api/admin/orders
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
    await admin.auth().verifyIdToken(token);
    return { ok: true };
  } catch (err) {
    return { error: 'Geçersiz veya süresi dolmuş oturum', status: 401 };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = await verifyAuth(req);
  if (auth.error) {
    return res.status(auth.status || 401).json({ error: auth.error });
  }

  try {
    const admin = getFirebaseAdmin();
    const db = admin.firestore();

    const ordersSnap = await db.collection('orders').get();
    const orders = ordersSnap.docs.map((d) => {
      const data = d.data();
      const createdAt = data.createdAt?.toDate?.();
      return {
        id: d.id,
        ...data,
        createdAt: createdAt ? createdAt.toISOString() : null
      };
    });

    // Sırala: en yeni önce
    orders.sort((a, b) => {
      const ta = a.createdAt?.toMillis?.() ?? a.createdAt?.seconds ?? 0;
      const tb = b.createdAt?.toMillis?.() ?? b.createdAt?.seconds ?? 0;
      return tb - ta;
    });

    // Her sipariş için users koleksiyonundan müşteri bilgilerini al
    const userIds = [...new Set(orders.map((o) => o.userId).filter(Boolean))];
    const userMap = {};

    for (const uid of userIds) {
      try {
        const userDoc = await db.collection('users').doc(uid).get();
        if (userDoc.exists) {
          const data = userDoc.data();
          userMap[uid] = {
            userName: [data.firstName, data.lastName].filter(Boolean).join(' ').trim() || data.email,
            email: data.email,
            userPhone: data.phone
          };
        }
      } catch (_) {
        userMap[uid] = {};
      }
    }

    // Siparişlerde yoksa users'dan doldur
    const enriched = orders.map((order) => {
      const user = userMap[order.userId] || {};
      return {
        ...order,
        userName: order.userName || user.userName || '',
        email: order.email || user.email || '',
        userPhone: order.userPhone || user.userPhone || ''
      };
    });

    return res.status(200).json(enriched);
  } catch (err) {
    console.error('Admin orders error:', err);
    return res.status(500).json({ error: 'Siparişler yüklenirken hata oluştu' });
  }
}
