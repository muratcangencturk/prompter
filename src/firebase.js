import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';
import {
  initializeFirestore,
  persistentLocalCache,
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { pendingAuthCallbacks } from './auth.js';

export async function loadFirebaseConfig(retries = 3) {
  if (window.firebaseConfig) {
    return window.firebaseConfig;
  }
  while (retries > 0) {
    try {
      const res = await fetch('./firebase.config.json');
      if (!res.ok) throw new Error('Firebase configuration not found');
      const cfg = await res.json();
      window.firebaseConfig = cfg;
      return cfg;
    } catch (err) {
      retries -= 1;
      if (!retries) {
        console.error('Failed to load Firebase config:', err);
        return null;
      }
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

export async function withRetry(fn, retries = 3, delay = 500) {
  let lastError;
  for (let i = 0; i < retries; i += 1) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }
  throw lastError;
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
  db = initializeFirestore(app, {
    cache: persistentLocalCache(),
  });
  pendingAuthCallbacks.forEach((cb) => onAuthStateChanged(auth, cb));
  pendingAuthCallbacks.length = 0;
  readyResolve();
}
