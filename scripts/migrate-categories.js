#!/usr/bin/env node
const admin = require('firebase-admin');

const appOptions = {};
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const svc = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    appOptions.credential = admin.credential.cert(svc);
  } catch (err) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT:', err);
  }
}

admin.initializeApp(appOptions);

const db = admin.firestore();

async function migrate() {
  const snap = await db.collection('prompts').get();
  for (const doc of snap.docs) {
    if (!doc.get('category')) {
      await doc.ref.set({ category: 'random' }, { merge: true });
      console.log(`Updated ${doc.id}`);
    }
  }
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
