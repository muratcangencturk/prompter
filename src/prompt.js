import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  orderBy,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
  increment,
  arrayUnion,
  arrayRemove,
  limit,
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db, withRetry } from './firebase.js';
import { sendNotification } from './notifications.js';

const samplePrompts = [
  'Describe a futuristic city where nature and technology coexist.',
  'Write a short story about a robot learning emotions.',
  'Imagine you can talk to animals for a day. What happens?',
  'Create a prompt for an artwork about space exploration.',
];

export const generatePrompt = () => {
  const idx = Math.floor(Math.random() * samplePrompts.length);
  return samplePrompts[idx];
};

export const savePrompt = async (
  text,
  userId,
  category = 'random',
  userName = '',
  userEmail = ''
) => {
  try {
    const q = query(
      collection(db, 'prompts'),
      where('userId', '==', userId),
      where('text', '==', text)
    );
    const snap = await withRetry(() => getDocs(q));
    if (!snap.empty) {
      const ref = snap.docs[0].ref;
      await withRetry(() =>
        updateDoc(ref, {
          category,
          shared: true,
          sharedBy: arrayUnion(userId),
          shareCount: increment(1),
          userName,
          userEmail,
        })
      );
      return ref;
    }
  } catch (err) {
    console.error('Failed to check existing prompt:', err);
  }
  return withRetry(() =>
    addDoc(collection(db, 'prompts'), {
      text,
      userId,
      userName,
      userEmail,
      category,
      createdAt: serverTimestamp(),
      likes: 0,
      likedBy: [],
      sharedBy: [userId],
      shared: true,
      saveCount: 0,
      shareCount: 1,
      commentCount: 0,
    })
  );
};

export const getUserPrompts = async (userId) => {
  const q = query(
    collection(db, 'prompts'),
    where('userId', '==', userId),
    where('sharedBy', 'array-contains', userId)
  );
  try {
    const snap = await withRetry(() => getDocs(q));
    const prompts = snap.docs.map((d) => ({
      id: d.id,
      category: d.get('category') || 'random',
      ...d.data(),
    }));
    prompts.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
    return prompts;
  } catch (err) {
    console.error('Failed to load user prompts:', err);
    return [];
  }
};

export const getAllPrompts = async () => {
  const q = query(
    collection(db, 'prompts'),
    where('shared', '==', true),
    orderBy('createdAt', 'desc')
  );
  const snap = await withRetry(() => getDocs(q));
  return snap.docs
    .map((d) => ({
      id: d.id,
      category: d.get('category') || 'random',
      ...d.data(),
    }))
    .filter((p) => Array.isArray(p.sharedBy) && p.sharedBy.length > 0);
};

export const likePrompt = async (promptId, userId) => {
  await withRetry(() =>
    updateDoc(doc(db, 'prompts', promptId), {
      likes: increment(1),
      likedBy: arrayUnion(userId),
    })
  );
  const snap = await withRetry(() => getDoc(doc(db, 'prompts', promptId)));
  const owner = snap.exists() ? snap.data().userId : null;
  if (owner && owner !== userId) {
    await sendNotification(owner, { type: 'like', promptId, from: userId });
  }
};

export const unlikePrompt = (promptId, userId) =>
  withRetry(() =>
    updateDoc(doc(db, 'prompts', promptId), {
      likes: increment(-1),
      likedBy: arrayRemove(userId),
    })
  );

export const unsharePrompt = (promptId, userId) =>
  withRetry(() =>
    updateDoc(doc(db, 'prompts', promptId), {
      sharedBy: arrayRemove(userId),
      shared: false,
    })
  );

export const sharePromptByUser = (promptId, userId) =>
  withRetry(() =>
    updateDoc(doc(db, 'prompts', promptId), {
      sharedBy: arrayUnion(userId),
      shared: true,
      shareCount: increment(1),
    })
  );

export const unsharePromptByUser = (promptId, userId) =>
  withRetry(() =>
    updateDoc(doc(db, 'prompts', promptId), {
      sharedBy: arrayRemove(userId),
      shareCount: increment(-1),
    })
  );

export const saveUserPrompt = (text, userId) =>
  withRetry(() =>
    addDoc(collection(db, `users/${userId}/savedPrompts`), {
      text,
      createdAt: serverTimestamp(),
    })
  );

export const incrementSaveCount = (promptId) =>
  withRetry(() =>
    updateDoc(doc(db, 'prompts', promptId), { saveCount: increment(1) })
  );

export const incrementShareCount = (promptId, delta = 1) =>
  withRetry(() =>
    updateDoc(doc(db, 'prompts', promptId), { shareCount: increment(delta) })
  );

export const getUserSavedPrompts = async (userId) => {
  const q = query(
    collection(db, `users/${userId}/savedPrompts`),
    orderBy('createdAt', 'desc')
  );
  const snap = await withRetry(() => getDocs(q));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updatePromptText = (promptId, newText) =>
  withRetry(() => updateDoc(doc(db, 'prompts', promptId), { text: newText }));

export const addComment = async (promptId, userId, text) => {
  await withRetry(() =>
    addDoc(collection(db, `prompts/${promptId}/comments`), {
      text,
      userId,
      createdAt: serverTimestamp(),
    })
  );
  await withRetry(() =>
    updateDoc(doc(db, 'prompts', promptId), {
      commentCount: increment(1),
    })
  );
  const snap = await withRetry(() => getDoc(doc(db, 'prompts', promptId)));
  const owner = snap.exists() ? snap.data().userId : null;
  if (owner && owner !== userId) {
    await sendNotification(owner, { type: 'comment', promptId, from: userId });
  }
};

export const getComments = async (promptId) => {
  const q = query(
    collection(db, `prompts/${promptId}/comments`),
    orderBy('createdAt', 'asc')
  );
  const snap = await withRetry(() => getDocs(q));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateComment = (promptId, commentId, newText) =>
  withRetry(() =>
    updateDoc(doc(db, `prompts/${promptId}/comments/${commentId}`), {
      text: newText,
    })
  );

export const deleteComment = async (promptId, commentId) => {
  await withRetry(() =>
    deleteDoc(doc(db, `prompts/${promptId}/comments/${commentId}`))
  );
  await withRetry(() =>
    updateDoc(doc(db, 'prompts', promptId), {
      commentCount: increment(-1),
    })
  );
};

export const getNewestPromptTimestamp = async () => {
  const q = query(
    collection(db, 'prompts'),
    where('shared', '==', true),
    orderBy('createdAt', 'desc'),
    limit(1)
  );
  const snap = await withRetry(() => getDocs(q));
  if (snap.empty) return null;
  const ts = snap.docs[0].get('createdAt');
  return ts ? ts.toMillis() : null;
};
