#!/usr/bin/env node
const admin = require('firebase-admin');

admin.initializeApp();

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
