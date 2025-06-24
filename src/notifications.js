import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db } from './firebase.js';

export const sendNotification = (uid, data) => {
  const { promptId, target, targetId, ...rest } = data || {};
  const payload = { ...rest };
  if (promptId) payload.promptId = promptId;
  else if (targetId) payload.promptId = targetId;
  else if (target) payload.target = target;
  return addDoc(collection(db, `users/${uid}/notifications`), {
    ...payload,
    createdAt: serverTimestamp(),
  });
};

export const markNotificationRead = (uid, id) =>
  updateDoc(doc(db, `users/${uid}/notifications/${id}`), { read: true });

export const listenNotifications = (uid, cb) => {
  const q = query(
    collection(db, `users/${uid}/notifications`),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snap) =>
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  );
};
