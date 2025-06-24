import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db } from './firebase.js';

export const setUserProfile = async (uid, profile) => {
  await setDoc(doc(db, 'users', uid, 'profile', 'info'), profile);
  const update = {};
  if (profile && profile.name) update.name = profile.name;
  if (profile && Object.prototype.hasOwnProperty.call(profile, 'bio')) {
    update.bio = profile.bio;
  }
  if (Object.keys(update).length) {
    await setDoc(doc(db, 'users', uid), update, { merge: true });
  }
};

export const getUserProfile = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid, 'profile', 'info'));
  return snap.exists() ? snap.data() : null;
};

export const getUserByName = async (name) => {
  const q = query(collection(db, 'users'), where('name', '==', name));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
};

export const followUser = async (currentUid, targetUid) => {
  if (!currentUid || !targetUid || currentUid === targetUid) return;
  await setDoc(
    doc(db, `users/${currentUid}/following`, targetUid),
    { createdAt: serverTimestamp() },
  );
  await setDoc(
    doc(db, `users/${targetUid}/followers`, currentUid),
    { createdAt: serverTimestamp() },
  );
};

export const unfollowUser = async (currentUid, targetUid) => {
  if (!currentUid || !targetUid || currentUid === targetUid) return;
  await deleteDoc(doc(db, `users/${currentUid}/following/${targetUid}`));
  await deleteDoc(doc(db, `users/${targetUid}/followers/${currentUid}`));
};

export const isFollowing = async (currentUid, targetUid) => {
  if (!currentUid || !targetUid) return false;
  const snap = await getDoc(doc(db, `users/${currentUid}/following/${targetUid}`));
  return snap.exists();
};

export const getFollowingIds = async (uid) => {
  const snap = await getDocs(collection(db, `users/${uid}/following`));
  return snap.docs.map((d) => d.id);
};

export const updateLastSocialVisit = (uid, ts) =>
  setDoc(doc(db, 'users', uid), { lastSocialVisit: ts }, { merge: true });

export const getLastSocialVisit = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() && snap.data().lastSocialVisit
    ? snap.data().lastSocialVisit
    : null;
};

