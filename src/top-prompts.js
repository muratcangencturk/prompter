import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db } from './firebase.js';

const fetchPromptText = async (id) => {
  try {
    const snap = await getDoc(doc(db, 'prompts', id));
    return snap.exists() ? snap.data().text : id;
  } catch {
    return id;
  }
};

const render = async (items) => {
  const list = document.getElementById('prompt-list');
  list.innerHTML = '';
  for (const item of items) {
    const text = await fetchPromptText(item.id);
    const card = document.createElement('div');
    card.className = 'bg-white/10 p-3 rounded-lg';
    const p = document.createElement('p');
    p.textContent = text;
    const score = document.createElement('p');
    score.className = 'text-xs text-blue-200';
    score.textContent = `Score: ${item.score}`;
    card.appendChild(p);
    card.appendChild(score);
    list.appendChild(card);
  }
  window.lucide?.createIcons();
};

const load = async () => {
  try {
    const snap = await getDoc(doc(db, 'stats', 'topPrompts'));
    if (!snap.exists()) return;
    await render(snap.data().list || []);
  } catch (err) {
    console.error('Failed to load rankings', err);
  }
};

document.addEventListener('DOMContentLoaded', load);
