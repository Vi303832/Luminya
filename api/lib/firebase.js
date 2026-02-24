/**
 * Shared Firebase Admin for API routes
 */

import admin from 'firebase-admin';

export function getFirebaseAdmin() {
  if (!admin.apps.length) {
    const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountVar) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON not configured');
    }
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountVar))
    });
  }
  return admin;
}
