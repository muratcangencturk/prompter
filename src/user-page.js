import { getUserByName, getUserProfile } from './user.js';
import { getUserPrompts } from './prompt.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db } from './firebase.js';

const getParam = (key) => new URLSearchParams(window.location.search).get(key);

const fetchCommentsCount = async (promptId) => {
  const snap = await getDocs(collection(db, `prompts/${promptId}/comments`));
  return snap.size;
};

const renderPrompts = async (prompts) => {
  const list = document.getElementById('prompt-list');
  list.innerHTML = '';
  let likes = 0;
  let comments = 0;
  let shares = 0;

  for (const p of prompts) {
    likes += p.likes || (Array.isArray(p.likedBy) ? p.likedBy.length : 0);
    shares += Array.isArray(p.sharedBy) ? p.sharedBy.length : 0;
    comments += await fetchCommentsCount(p.id);

    const card = document.createElement('div');
    card.className =
      'bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg';
    const text = document.createElement('p');
    text.textContent = p.text;
    card.appendChild(text);
    list.appendChild(card);
  }

  document.getElementById('stat-prompts').textContent = prompts.length.toString();
  document.getElementById('stat-likes').textContent = likes.toString();
  document.getElementById('stat-comments').textContent = comments.toString();
  document.getElementById('stat-saves').textContent = '0';
  document.getElementById('stat-shares').textContent = shares.toString();

  window.lucide?.createIcons();
};

const init = async () => {
  let uid = getParam('uid');
  const nameQuery = getParam('name');
  let name = '';

  if (!uid && nameQuery) {
    const user = await getUserByName(nameQuery);
    if (user) {
      uid = user.id;
      name = user.name || nameQuery;
    }
  }

  if (!uid) {
    document.getElementById('user-name').textContent = 'User not found';
    return;
  }

  const profile = await getUserProfile(uid);
  if (profile && profile.name) name = profile.name;

  document.getElementById('user-name').textContent = name || uid;
  const prompts = await getUserPrompts(uid);
  await renderPrompts(prompts);
};

document.addEventListener('DOMContentLoaded', init);
