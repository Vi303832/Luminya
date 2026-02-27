/**
 * Bekleyen (ödenmemiş) siparişleri 5 dakika sonra siler.
 * Vercel Cron tarafından her dakika çağrılır.
 * CRON_SECRET env ile korunmalıdır.
 *
 * GET /api/cleanup-pending-orders
 * Header: Authorization: Bearer <CRON_SECRET>
 */

import { getFirebaseAdmin } from './lib/firebase.js';

const PENDING_TIMEOUT_MS = 5 * 60 * 1000; // 5 dakika

function verifyCronSecret(req) {
  const authHeader = req.headers.authorization;
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return { error: 'CRON_SECRET not configured', status: 500 };
  }
  if (authHeader !== `Bearer ${expected}`) {
    return { error: 'Unauthorized', status: 401 };
  }
  return { ok: true };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = verifyCronSecret(req);
  if (auth.error) {
    return res.status(auth.status || 401).json({ error: auth.error });
  }

  try {
    const admin = getFirebaseAdmin();
    const db = admin.firestore();
    const cutoff = new Date(Date.now() - PENDING_TIMEOUT_MS);
    const cutoffTimestamp = admin.firestore.Timestamp.fromDate(cutoff);

    const snapshot = await db
      .collection('orders')
      .where('status', '==', 'pending')
      .where('createdAt', '<', cutoffTimestamp)
      .get();

    const batch = db.batch();
    let deletedCount = 0;

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
      deletedCount++;
    });

    if (deletedCount > 0) {
      await batch.commit();
    }

    return res.status(200).json({
      ok: true,
      deleted: deletedCount,
      message: `${deletedCount} bekleyen sipariş silindi`
    });
  } catch (err) {
    console.error('Cleanup pending orders error:', err);
    return res.status(500).json({ error: 'Temizlik işlemi başarısız' });
  }
}
