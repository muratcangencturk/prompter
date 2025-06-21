import { initFirebase, firebaseConfig } from './firebase.js';
import { onAuth } from './auth.js';
import { appState } from './state.js';

initFirebase(firebaseConfig);

onAuth((user) => {
  appState.currentUser = user;
});
