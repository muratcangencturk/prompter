import {
  getUserByName,
  getUserProfile,
  followUser,
  unfollowUser,
  isFollowing,
} from './user.js';
import { onAuth } from './auth.js';
import { getUserPrompts } from './prompt.js';
import { categories } from './prompts.js';

const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name.en]));


const getParam = (key) => new URLSearchParams(window.location.search).get(key);

const renderPrompts = async (prompts) => {
  const list = document.getElementById('prompt-list');
  list.innerHTML = '';
  let likes = 0;
  let comments = 0;
  let shares = 0;
  let saves = 0;

  for (const p of prompts) {
    likes += p.likes || (Array.isArray(p.likedBy) ? p.likedBy.length : 0);
    shares += p.shareCount || (Array.isArray(p.sharedBy) ? p.sharedBy.length : 0);
    saves += p.saveCount || 0;
    comments += p.commentCount || 0;

    const card = document.createElement('div');
    card.className =
      'bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg';
    const text = document.createElement('p');
    text.textContent = p.text;
    const cat = document.createElement('p');
    cat.className = 'text-blue-200 text-xs mt-1';
    cat.textContent = categoryMap[p.category] || p.category || 'random';
    card.appendChild(text);
    card.appendChild(cat);
    list.appendChild(card);
  }

  document.getElementById('stat-prompts').textContent = prompts.length.toString();
  document.getElementById('stat-likes').textContent = likes.toString();
  document.getElementById('stat-comments').textContent = comments.toString();
  document.getElementById('stat-saves').textContent = saves.toString();
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
  const bio = profile && typeof profile.bio === 'string' ? profile.bio : '';

  document.getElementById('user-name').textContent = name || uid;
  const bioEl = document.getElementById('user-bio');
  if (bioEl) bioEl.textContent = bio;

  const followBtn = document.getElementById('follow-btn');
  let currentUserId = null;

  const updateFollowBtn = async () => {
    if (!followBtn || !currentUserId || currentUserId === uid) {
      followBtn?.classList.add('hidden');
      return;
    }
    const following = await isFollowing(currentUserId, uid);
    followBtn.textContent = following ? 'Unfollow' : 'Follow';
    followBtn.dataset.following = following ? '1' : '0';
    followBtn.classList.remove('hidden');
  };

  followBtn?.addEventListener('click', async () => {
    if (!currentUserId) return;
    const following = followBtn.dataset.following === '1';
    followBtn.disabled = true;
    try {
      if (following) await unfollowUser(currentUserId, uid);
      else await followUser(currentUserId, uid);
    } catch (err) {
      console.error('Follow toggle failed', err);
    }
    followBtn.disabled = false;
    await updateFollowBtn();
  });

  onAuth(async (u) => {
    currentUserId = u ? u.uid : null;
    await updateFollowBtn();
  });

  const prompts = await getUserPrompts(uid);
  await renderPrompts(prompts);
};

document.addEventListener('DOMContentLoaded', init);
