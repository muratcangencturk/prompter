import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db } from './firebase.js';
import { getUserProfile } from './user.js';

const fetchName = async (uid) => {
  try {
    const profile = await getUserProfile(uid);
    return profile && profile.name ? profile.name : uid;
  } catch {
    return uid;
  }
};

const render = async (items) => {
  const list = document.getElementById('pro-list');
  list.innerHTML = '';
  for (const item of items) {
    const name = await fetchName(item.userId);
    const el = document.createElement('div');
    el.className = 'bg-white/10 p-2 rounded-lg flex justify-between';
    const spanName = document.createElement('span');
    spanName.textContent = name;
    const spanSince = document.createElement('span');
    spanSince.className = 'text-xs text-blue-200';
    const dateStr = new Date(item.since).toLocaleDateString();
    spanSince.textContent = `Since: ${dateStr}`;
    el.appendChild(spanName);
    el.appendChild(spanSince);
    list.appendChild(el);
  }
  window.lucide?.createIcons();
};

const showMessage = (msg) => {
  const list = document.getElementById('pro-list');
  if (list) {
    list.innerHTML = `<p class="text-center text-blue-200 text-sm">${msg}</p>`;
  }
};

const load = async () => {
  try {
    const snap = await getDoc(doc(db, 'stats', 'longestPro'));
    if (!snap.exists()) {
      console.error('longestPro document does not exist');
      showMessage('Rankings are not available.');
      return;
    }
    await render(snap.data().list || []);
  } catch (err) {
    console.error('Failed to load rankings', err);
    showMessage('Failed to load rankings.');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.firebaseInitPromise) window.firebaseInitPromise.then(load);
  else load();
});
