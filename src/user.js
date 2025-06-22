import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db } from './firebase.js';

export const setUserProfile = (uid, profile) =>
  setDoc(doc(db, 'users', uid, 'profile'), profile);

export const getUserProfile = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid, 'profile'));
  return snap.exists() ? snap.data() : null;
};
