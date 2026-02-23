/**
 * Firestore-based Rate Limiter
 * Sliding window: max N requests per window (per IP)
 */

import { getFirebaseAdmin } from './firebase.js';

const WINDOW_MS = 60 * 1000; // 1 dakika
const MAX_REQUESTS = 10;

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return String(forwarded).split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.connection?.remoteAddress || '127.0.0.1';
}

function hashIp(ip) {
  let h = 0;
  const s = String(ip);
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return `rl_${Math.abs(h).toString(36)}`;
}

export async function checkRateLimit(req) {
  const ip = getClientIp(req);
  const key = hashIp(ip);
  const now = Date.now();

  const db = getFirebaseAdmin().firestore();
  const ref = db.collection('rateLimits').doc(key);

  try {
    const result = await db.runTransaction(async (tx) => {
      const doc = await tx.get(ref);
      const data = doc.exists ? doc.data() : null;
      const windowStart = data?.windowStart ?? now;
      const count = data?.count ?? 0;

      const isWindowExpired = now - windowStart > WINDOW_MS;
      const newCount = isWindowExpired ? 1 : count + 1;
      const newWindowStart = isWindowExpired ? now : windowStart;

      tx.set(ref, {
        count: newCount,
        windowStart: newWindowStart,
        lastRequest: now,
        ip: ip.slice(0, 45)
      });

      return { allowed: newCount <= MAX_REQUESTS, remaining: Math.max(0, MAX_REQUESTS - newCount) };
    });

    return result;
  } catch (err) {
    console.error('Rate limit check error:', err);
    return { allowed: true, remaining: MAX_REQUESTS };
  }
}
