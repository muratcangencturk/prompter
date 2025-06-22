#!/usr/bin/env node
const admin = require('firebase-admin');

// Initialize using default credentials
admin.initializeApp();

const db = admin.firestore();

async function migrate() {
  const usersSnap = await db.collection('users').get();
  for (const user of usersSnap.docs) {
    if (user.get('name')) continue;
    const profileSnap = await db.doc(`users/${user.id}/profile`).get();
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
