/**
 * Firestore-based Idempotency
 * Aynı Idempotency-Key ile tekrarlanan isteklerde önbelleğe alınmış yanıt döner
 */

import { getFirebaseAdmin } from './firebase.js';

const TTL_MS = 24 * 60 * 60 * 1000; // 24 saat

export async function getCachedResponse(key, uid) {
  if (!key) return null;

  const db = getFirebaseAdmin().firestore();
  const ref = db.collection('idempotencyKeys').doc(key);
  const doc = await ref.get();

  if (!doc.exists) return null;

  const data = doc.data();
  if (data.userId !== uid) {
    return { error: 'Idempotency-Key başka kullanıcıya ait', status: 403 };
  }
  if (Date.now() - (data.createdAt?.toMillis?.() ?? 0) > TTL_MS) {
    return null;
  }
  if (data.status === 'processing') {
    return { error: 'İşlem devam ediyor, lütfen bekleyin', status: 409 };
  }
  if (data.status === 'complete' && data.response) {
    return { cached: true, response: data.response, statusCode: data.statusCode ?? 200 };
  }

  return null;
}

export async function createProcessing(key, uid) {
  if (!key) return { created: false };

  const db = getFirebaseAdmin().firestore();
  const ref = db.collection('idempotencyKeys').doc(key);

  try {
    await ref.create({
      key,
      userId: uid,
      status: 'processing',
      createdAt: new Date()
    });
    return { created: true };
  } catch (err) {
    if (err.code === 6 || err.code === 'ALREADY_EXISTS') {
      return { created: false };
    }
    throw err;
  }
}

export async function saveResponse(key, response, statusCode = 200) {
  if (!key) return;

  const db = getFirebaseAdmin().firestore();
  const ref = db.collection('idempotencyKeys').doc(key);

  await ref.set(
    {
      status: 'complete',
      response,
      statusCode,
      completedAt: new Date()
    },
    { merge: true }
  );
}
