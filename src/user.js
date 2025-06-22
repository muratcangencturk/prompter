import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db } from './firebase.js';

export const setUserProfile = (uid, profile) =>
  setDoc(doc(db, 'users', uid, 'profile'), profile);

export const getUserProfile = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid, 'profile'));
  return snap.exists() ? snap.data() : null;
};

export const getUserByName = async (name) => {
  const q = query(collection(db, 'users'), where('name', '==', name));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
};
