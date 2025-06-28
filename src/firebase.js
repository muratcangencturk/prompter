import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { runPendingAuthCallbacks } from './auth.js';

export async function loadFirebaseConfig() {
  if (window.firebaseConfig) {
    return window.firebaseConfig;
  }
  const res = await fetch('/firebase.config.json');
  if (!res.ok) {
    throw new Error('Firebase configuration not found');
  }
  return res.json();
}

export let app;
export let auth;
export let db;

let readyResolve;
export const firebaseReady = new Promise((resolve) => {
  readyResolve = resolve;
});

export function initFirebase(config) {
  app = initializeApp(config);
  auth = getAuth(app);
  db = getFirestore(app);
  runPendingAuthCallbacks();
