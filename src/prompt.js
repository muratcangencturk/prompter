import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  orderBy,
  Timestamp,
  updateDoc,
  doc,
  increment,
  arrayUnion,
  arrayRemove,
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db } from './firebase.js';
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

export const savePrompt = (text, userId) =>
  addDoc(collection(db, 'prompts'), {
    text,
    userId,
    createdAt: Timestamp.now(),
    likes: 0,
    likedBy: [],
    sharedBy: [userId],
    shared: true,
  });

export const getUserPrompts = async (userId) => {
  const q = query(
    collection(db, 'prompts'),
    where('userId', '==', userId),
    where('shared', '==', true)
  );
  const snap = await getDocs(q);
  const prompts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  prompts.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
  return prompts;
};

export const getAllPrompts = async () => {
  const q = query(
    collection(db, 'prompts'),
    where('shared', '==', true),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter(
      (p) => Array.isArray(p.sharedBy) && p.sharedBy.length > 0
    );
};

export const likePrompt = async (promptId, userId) => {
  await updateDoc(doc(db, 'prompts', promptId), {
    likes: increment(1),
    likedBy: arrayUnion(userId),
  });
  const snap = await getDoc(doc(db, 'prompts', promptId));
  const owner = snap.exists() ? snap.data().userId : null;
  if (owner && owner !== userId) {
    await sendNotification(owner, { type: 'like', promptId, from: userId });
  }
};

export const unlikePrompt = (promptId, userId) =>
  updateDoc(doc(db, 'prompts', promptId), {
    likes: increment(-1),
    likedBy: arrayRemove(userId),
  });

export const unsharePrompt = (promptId, userId) =>
  updateDoc(doc(db, 'prompts', promptId), {
    sharedBy: arrayRemove(userId),
    shared: false,
  });

export const saveUserPrompt = (text, userId) =>
  addDoc(collection(db, `users/${userId}/savedPrompts`), {
    text,
    createdAt: Timestamp.now(),
  });

export const getUserSavedPrompts = async (userId) => {
  const q = query(
    collection(db, `users/${userId}/savedPrompts`),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updatePromptText = (promptId, newText) =>
  updateDoc(doc(db, 'prompts', promptId), { text: newText });

export const addComment = async (promptId, userId, text) => {
  await addDoc(collection(db, `prompts/${promptId}/comments`), {
    text,
    userId,
    createdAt: Timestamp.now(),
  });
  const snap = await getDoc(doc(db, 'prompts', promptId));
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
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};
