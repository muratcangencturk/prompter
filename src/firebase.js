import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';

export const firebaseConfig = {
  apiKey: 'AIzaSyCiSVRdzDJPsYCWsTvGxueCs-Fcf5LCaYM',
  authDomain: 'prompter-cc95c.firebaseapp.com',
  projectId: 'prompter-cc95c',
  storageBucket: 'prompter-cc95c.firebasestorage.app',
  messagingSenderId: '349560111475',
  appId: '1:349560111475:web:b8152fd082702df9e18506',
  measurementId: 'G-HTSK6FGDQD',
};

export let app;
export let auth;
export let db;

export function initFirebase(config) {
  app = initializeApp(config);
  auth = getAuth(app);
  db = getFirestore(app);
}
