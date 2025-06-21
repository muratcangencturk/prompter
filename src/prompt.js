import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
  updateDoc,
  doc,
  increment,
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db } from './firebase.js';

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
  });

export const getUserPrompts = async (userId) => {
  const q = query(
    collection(db, 'prompts'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getAllPrompts = async () => {
  const q = query(collection(db, 'prompts'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const likePrompt = (promptId) =>
  updateDoc(doc(db, 'prompts', promptId), { likes: increment(1) });
