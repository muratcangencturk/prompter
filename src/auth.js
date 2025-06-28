import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';
import { auth } from './firebase.js';

export const pendingAuthCallbacks = [];

export const register = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const onAuth = (cb) => {
  if (!auth) {
    pendingAuthCallbacks.push(cb);
    return;
  }
  onAuthStateChanged(auth, cb);
};

export const runPendingAuthCallbacks = () => {
  if (auth) {
    pendingAuthCallbacks.forEach((cb) => onAuthStateChanged(auth, cb));
    pendingAuthCallbacks.length = 0;
  }
};
