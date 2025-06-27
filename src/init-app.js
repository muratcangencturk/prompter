import { initFirebase, loadFirebaseConfig } from './firebase.js';
import { onAuth } from './auth.js';
import { appState } from './state.js';
import { getUserSavedPrompts } from './prompt.js';

loadFirebaseConfig()
  .then((config) => {
    initFirebase(config);
    onAuth(async (user) => {
      appState.currentUser = user;
      if (!user) return;
      try {
        const docs = await getUserSavedPrompts(user.uid);
        const texts = docs.map((d) => d.text);
        const merged = Array.from(
          new Set([...appState.savedPrompts, ...texts]),
        );
        localStorage.setItem('savedPrompts', JSON.stringify(merged));
        appState.savedPrompts = merged;
      } catch (err) {
        console.error('Failed to sync saved prompts:', err);
      }
    });
  })
  .catch((err) => {
    console.error('Failed to initialize Firebase:', err);
  });
