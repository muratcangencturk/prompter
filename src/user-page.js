import {
  getUserByName,
  getUserProfile,
  followUser,
  unfollowUser,
  isFollowing,
  getFollowingIds,
  getFollowerIds,
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
  const dmLink = document.getElementById('dm-link');
  const followersLink = document.getElementById('stat-followers');
  const followingLink = document.getElementById('stat-following');
  const followersList = document.getElementById('followers-list');
  const followingList = document.getElementById('following-list');
  let followerIds = [];
  let followingIds = [];

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

  const updateFollowCounts = async () => {
    followingIds = await getFollowingIds(uid);
    followerIds = await getFollowerIds(uid);
    if (followingLink) followingLink.textContent = followingIds.length.toString();
    if (followersLink) followersLink.textContent = followerIds.length.toString();
  };
  await updateFollowCounts();

  const followBtn = document.getElementById('follow-btn');
  let currentUserId = null;

  const updateDmLink = () => {
    if (!dmLink) return;
    if (currentUserId && currentUserId !== uid) {
      dmLink.href = `dm.html?uid=${encodeURIComponent(uid)}`;
      dmLink.classList.remove('hidden');
    } else {
      dmLink.classList.add('hidden');
    }
  };

  updateDmLink();

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

  const showList = async (ids, container) => {
    if (!container) return;
    container.innerHTML = '';
    if (ids.length === 0) {
      container.classList.toggle('hidden', false);
      return;
    }
    const names = await Promise.all(
      ids.map((id) => getUserProfile(id).then((p) => p?.name || id))
    );
    ids.forEach((id, idx) => {
      const a = document.createElement('a');
      a.href = `user.html?uid=${id}`;
      a.className = 'block underline';
      a.textContent = names[idx];
      container.appendChild(a);
    });
    container.classList.toggle('hidden', false);
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
    await updateFollowCounts();
  });

  followersLink?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!followersList) return;
    if (!followersList.classList.contains('hidden')) {
      followersList.classList.add('hidden');
      followingList?.classList.add('hidden');
      return;
    }
    showList(followerIds, followersList);
    followingList?.classList.add('hidden');
  });

  followingLink?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!followingList) return;
    if (!followingList.classList.contains('hidden')) {
      followingList.classList.add('hidden');
      followersList?.classList.add('hidden');
      return;
    }
    showList(followingIds, followingList);
    followersList?.classList.add('hidden');
  });

  onAuth(async (u) => {
    currentUserId = u ? u.uid : null;
    await updateFollowBtn();
    updateDmLink();
    await updateFollowCounts();
  });

  const prompts = await getUserPrompts(uid);
  await renderPrompts(prompts);
};

document.addEventListener('DOMContentLoaded', init);
