import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db } from './firebase.js';

export const sendNotification = (uid, data) =>
  addDoc(collection(db, `users/${uid}/notifications`), {
    ...data,
    createdAt: serverTimestamp(),
  });

export const listenNotifications = (uid, cb) => {
  const q = query(
    collection(db, `users/${uid}/notifications`),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snap) =>
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  );
};
