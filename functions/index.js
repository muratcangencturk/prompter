const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
const promptScore = (d = {}) => (d.likes || 0) + (d.saveCount || 0) + (d.shareCount || 0);
const collectorScore = ({likes=0,saves=0,shares=0}={}) => likes + saves + shares;


const computeRankings = async () => {
  const snap = await db.collection('prompts').get();
  const promptScores = [];
  const userScores = {};

  snap.forEach((doc) => {
    const data = doc.data();
    const score = promptScore(data);
    promptScores.push({ id: doc.id, userId: data.userId, score });
    userScores[data.userId] = (userScores[data.userId] || 0) + score;
  });

  promptScores.sort((a, b) => b.score - a.score);
  const topPrompts = promptScores.slice(0, 20);
  await db.doc('stats/topPrompts').set({ list: topPrompts });

  const creators = Object.entries(userScores).map(([userId, score]) => ({
    userId,
    score,
  }));
  creators.sort((a, b) => b.score - a.score);
  const topCreators = creators.slice(0, 20);
  await db.doc('stats/topCreators').set({ list: topCreators });

  // collectors
  const usersSnap = await db.collection('users').get();
  const collectorArr = [];
  for (const userDoc of usersSnap.docs) {
    const uid = userDoc.id;
    const saved = await db.collection(`users/${uid}/savedPrompts`).get();
    const liked = await db
      .collection('prompts')
      .where('likedBy', 'array-contains', uid)
      .get();
    const shared = await db
      .collection('prompts')
      .where('sharedBy', 'array-contains', uid)
      .get();
    const score = collectorScore({
      likes: liked.size,
      saves: saved.size,
      shares: shared.size,
    });
    collectorArr.push({ userId: uid, score });
  }
  collectorArr.sort((a, b) => b.score - a.score);
  await db.doc('stats/topCollectors').set({ list: collectorArr.slice(0, 20) });
};

exports.scheduledComputeRankings = functions.pubsub
  .schedule('every 24 hours')
  .onRun(computeRankings);

exports.computeRankings = functions.https.onRequest(async (req, res) => {
  await computeRankings();
  res.json({ status: 'ok' });
});
