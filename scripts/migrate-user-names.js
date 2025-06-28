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

// Initialize using default credentials or the provided service account
admin.initializeApp(appOptions);

const db = admin.firestore();

async function migrate() {
  const usersSnap = await db.collection('users').get();
  for (const user of usersSnap.docs) {
    if (user.get('name')) continue;
    const profileSnap = await db.doc(`users/${user.id}/profile/info`).get();
    const profile = profileSnap.exists ? profileSnap.data() : null;
    if (profile && profile.name) {
      await user.ref.set({ name: profile.name }, { merge: true });
      console.log(`Updated user ${user.id}`);
    }
  }
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
