#!/usr/bin/env node
const admin = require('firebase-admin');

// Initialize using default credentials
admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

async function migrate() {
  const usersSnap = await db.collection('users').get();
  for (const user of usersSnap.docs) {
    if (user.get('email')) continue;
    const profileRef = db.doc(`users/${user.id}/profile/info`);
    const profileSnap = await profileRef.get();
    const profile = profileSnap.exists ? profileSnap.data() : null;
    let email = profile && profile.email ? profile.email : null;
    if (!email) {
      try {
        const authUser = await auth.getUser(user.id);
        email = authUser.email || null;
      } catch (err) {
        console.error(`Failed to fetch auth for ${user.id}:`, err.message);
      }
    }
    if (email) {
      await user.ref.set({ email }, { merge: true });
      await profileRef.set({ email }, { merge: true });
      console.log(`Updated user ${user.id}`);
    }
  }
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
