import { initFirebase, loadFirebaseConfig, app } from './firebase.js';
import { onAuth } from './auth.js';
import { appState } from './state.js';
import { getUserSavedPrompts } from './prompt.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js';

export let analytics;

export const firebaseInitPromise = loadFirebaseConfig()
  .then((config) => {
    if (!config) throw new Error('Missing Firebase config');
    initFirebase(config);
    analytics = getAnalytics(app);
    return new Promise((resolve) => {
      onAuth(async (user) => {
        appState.currentUser = user;
        if (user) {
          try {
            const docs = await getUserSavedPrompts(user.uid);
            const texts = docs.map((d) => d.text);
            const merged = Array.from(new Set([...appState.savedPrompts, ...texts]));
            localStorage.setItem('savedPrompts', JSON.stringify(merged));
            appState.savedPrompts = merged;
          } catch (err) {
            console.error('Failed to sync saved prompts:', err);
          }
        }
        resolve();
      });
    });
  })
  .catch((err) => {
    console.error('Failed to initialize Firebase:', err);
    throw err;
  });

window.firebaseInitPromise = firebaseInitPromise;
