const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
const promptScore = (d = {}) => (d.likes || 0) + (d.saveCount || 0) + (d.shareCount || 0);
const collectorScore = ({ likes = 0, saves = 0, shares = 0 } = {}) =>
  likes + saves + shares;

/**
 * Aggregate like/share/save counts for each user from prompt and savedPrompt
 * snapshots. This allows us to compute collector rankings without querying
 * Firestore for every user individually. When Firestore count() aggregation is
 * available, it could replace this manual aggregation.
 *
 * @param {Array} promptDocs - Array of prompt DocumentSnapshots.
 * @param {Array} savedDocs - Array of savedPrompt DocumentSnapshots.
 * @returns {{likes: Object, shares: Object, saves: Object}}
 */
const aggregateInteractions = (promptDocs = [], savedDocs = []) => {
  const likes = {};
  const shares = {};
  const saves = {};

  for (const doc of promptDocs) {
    const data = doc.data();
    if (Array.isArray(data.likedBy)) {
      for (const uid of data.likedBy) {
        likes[uid] = (likes[uid] || 0) + 1;
      }
    }
    if (Array.isArray(data.sharedBy)) {
      for (const uid of data.sharedBy) {
        shares[uid] = (shares[uid] || 0) + 1;
      }
    }
  }

  for (const doc of savedDocs) {
    const uid = doc.ref.parent.parent.id;
    saves[uid] = (saves[uid] || 0) + 1;
  }

  return { likes, shares, saves };
};


const computeRankings = async () => {
  const snap = await db.collection('prompts').get();
  const savedSnap = await db.collectionGroup('savedPrompts').get();
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

  // aggregate collector interactions without per-user queries
  const { likes, shares, saves } = aggregateInteractions(snap.docs, savedSnap.docs);

  // collectors
  const usersSnap = await db.collection('users').get();
  const collectorArr = [];
  const proArr = [];
  for (const userDoc of usersSnap.docs) {
    const uid = userDoc.id;
    const userData = userDoc.data();
    const score = collectorScore({
      likes: likes[uid] || 0,
      saves: saves[uid] || 0,
      shares: shares[uid] || 0,
    });
    collectorArr.push({ userId: uid, score });

    if (userData.proSince) {
      proArr.push({ userId: uid, since: userData.proSince.toMillis() });
    }
  }
  collectorArr.sort((a, b) => b.score - a.score);
  await db.doc('stats/topCollectors').set({ list: collectorArr.slice(0, 20) });

  proArr.sort((a, b) => a.since - b.since);
  await db.doc('stats/longestPro').set({ list: proArr.slice(0, 20) });

  const donationsSnap = await db.collection('donations').get();
  const totals = {};
  donationsSnap.forEach((d) => {
    const data = d.data();
    if (!data.userId) return;
    const amount = Number(data.amount) || 0;
    totals[data.userId] = (totals[data.userId] || 0) + amount;
  });
  const supporterArr = Object.entries(totals).map(([userId, total]) => ({
    userId,
    total,
  }));
  supporterArr.sort((a, b) => b.total - a.total);
  await db.doc('stats/topSupporters').set({ list: supporterArr.slice(0, 20) });
};

exports.aggregateInteractions = aggregateInteractions;

exports.scheduledComputeRankings = functions.pubsub
  .schedule('every 24 hours')
  .onRun(computeRankings);

exports.computeRankings = functions.https.onRequest(async (req, res) => {
  await computeRankings();
  res.json({ status: 'ok' });
});
