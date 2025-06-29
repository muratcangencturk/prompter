import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  doc,
  increment,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  getDoc,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db, withRetry } from './firebase.js';
import { sendNotification } from './notifications.js';

export const createPost = async (
  text,
  userId,
  userName = '',
  userEmail = ''
) => {
  return withRetry(() =>
    addDoc(collection(db, 'blogPosts'), {
      text,
      userId,
      userName,
      userEmail,
      createdAt: serverTimestamp(),
      likes: 0,
      likedBy: [],
      sharedBy: [userId],
      shared: true,
      shareCount: 1,
      commentCount: 0,
    })
  );
};

export const getAllPosts = async () => {
  const cacheKey = 'blogCache';
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    /* ignore */
  }
  const q = query(
    collection(db, 'blogPosts'),
    where('shared', '==', true),
    orderBy('createdAt', 'desc')
  );
  const snap = await withRetry(() => getDocs(q));
  const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  try {
    localStorage.setItem(cacheKey, JSON.stringify(posts));
  } catch {
    /* ignore */
  }
  return posts;
};

export const likePost = async (postId, userId) => {
  await withRetry(() =>
    updateDoc(doc(db, 'blogPosts', postId), {
      likes: increment(1),
      likedBy: arrayUnion(userId),
    })
  );
  const snap = await withRetry(() => getDoc(doc(db, 'blogPosts', postId)));
  const owner = snap.exists() ? snap.data().userId : null;
  if (owner && owner !== userId) {
    await sendNotification(owner, {
      type: 'like',
      targetId: postId,
      from: userId,
    });
  }
};

export const unlikePost = (postId, userId) =>
  withRetry(() =>
    updateDoc(doc(db, 'blogPosts', postId), {
      likes: increment(-1),
      likedBy: arrayRemove(userId),
    })
  );

export const sharePostByUser = (postId, userId) =>
  withRetry(() =>
    updateDoc(doc(db, 'blogPosts', postId), {
      sharedBy: arrayUnion(userId),
      shared: true,
      shareCount: increment(1),
    })
  );

export const unsharePostByUser = (postId, userId) =>
  withRetry(() =>
    updateDoc(doc(db, 'blogPosts', postId), {
      sharedBy: arrayRemove(userId),
      shareCount: increment(-1),
    })
  );

export const addComment = async (postId, userId, text) => {
  await withRetry(() =>
    addDoc(collection(db, `blogPosts/${postId}/comments`), {
      text,
      userId,
      createdAt: serverTimestamp(),
    })
  );
  await withRetry(() =>
    updateDoc(doc(db, 'blogPosts', postId), {
      commentCount: increment(1),
    })
  );
  const snap = await withRetry(() => getDoc(doc(db, 'blogPosts', postId)));
  const owner = snap.exists() ? snap.data().userId : null;
  if (owner && owner !== userId) {
    await sendNotification(owner, {
      type: 'comment',
      targetId: postId,
      from: userId,
    });
  }
};

export const getComments = async (postId) => {
  const q = query(
    collection(db, `blogPosts/${postId}/comments`),
    orderBy('createdAt', 'asc')
  );
  const snap = await withRetry(() => getDocs(q));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updatePostText = (postId, newText) =>
  withRetry(() => updateDoc(doc(db, 'blogPosts', postId), { text: newText }));

export const deletePost = (postId) =>
  withRetry(() => deleteDoc(doc(db, 'blogPosts', postId)));

export const postScore = ({ likes = 0, commentCount = 0 } = {}) =>
  likes + commentCount;
