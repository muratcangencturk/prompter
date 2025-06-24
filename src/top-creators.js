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
  const list = document.getElementById('creator-list');
  list.innerHTML = '';
  for (const item of items) {
    const name = await fetchName(item.userId);
    const el = document.createElement('div');
    el.className = 'bg-white/10 p-2 rounded-lg flex justify-between';
    const spanName = document.createElement('span');
    spanName.textContent = name;
    const spanScore = document.createElement('span');
    spanScore.className = 'text-xs text-blue-200';
    spanScore.textContent = `Score: ${item.score}`;
    el.appendChild(spanName);
    el.appendChild(spanScore);
    list.appendChild(el);
  }
  window.lucide?.createIcons();
};

const load = async () => {
  try {
    const snap = await getDoc(doc(db, 'stats', 'topCreators'));
    if (!snap.exists()) return;
    await render(snap.data().list || []);
  } catch (err) {
    console.error('Failed to load rankings', err);
  }
};

document.addEventListener('DOMContentLoaded', load);
