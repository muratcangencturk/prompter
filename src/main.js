import { initializeApp } from './ui.js';
import { onAuth } from './auth.js';
import { listenNotifications, markNotificationRead } from './notifications.js';
import { appState } from './state.js';
import { getNewestPromptTimestamp } from './prompt.js';
import { getLastSocialVisit } from './user.js';

let notificationBtn;
let notificationCountEl;
let notificationsPanel;
let notifications = [];
let unsubscribeNotifications;
let socialBadge;

const renderNotifications = () => {
  if (!notificationCountEl || !notificationsPanel) return;
  const unread = notifications.filter((n) => !n.read);
  if (unread.length) {
    notificationCountEl.textContent = unread.length.toString();
    notificationCountEl.classList.remove('hidden');
  } else {
    notificationCountEl.classList.add('hidden');
  }
  notificationsPanel.innerHTML = '';
  notifications.forEach((n) => {
    const link = document.createElement('a');
    let msg = '';
    if (n.type === 'like') msg = 'Your prompt received a like.';
    else if (n.type === 'comment') msg = 'New comment on your prompt.';
    else if (n.type === 'share') msg = 'Your prompt was shared.';
    else msg = 'New activity on your prompt.';
    link.textContent = msg;
    link.href = n.promptId ? `social.html#${n.promptId}` : 'social.html';
    link.className =
      'block p-1 border-b border-white/20 last:border-b-0 hover:bg-white/10';
    link.addEventListener('click', async () => {
      if (appState.currentUser) {
        try {
          await markNotificationRead(appState.currentUser.uid, n.id);
        } catch (err) {
          console.error('Failed to mark notification read:', err);
        }
      }
      n.read = true;
      renderNotifications();
    });
    notificationsPanel.appendChild(link);
  });
};

const initNotifications = (uid) => {
  unsubscribeNotifications?.();
  unsubscribeNotifications = listenNotifications(uid, (data) => {
    notifications = data;
    renderNotifications();
  });
};


const hideEmptyAdSlots = () => {
  const slots = document.querySelectorAll('.ad-slot');
  slots.forEach((slot) => {
    const hasAd = slot.querySelector('iframe, img, ins');
    if (!hasAd || slot.offsetHeight < 5) {
      slot.remove();
    }
  });
};

const checkForNewPrompts = async (uid) => {
  if (!socialBadge) {
    socialBadge = document.getElementById('social-new-badge');
  }
  if (!socialBadge) return;
  try {
    let last = 0;
    const local = parseInt(localStorage.getItem('socialLastVisit'), 10);
    if (!Number.isNaN(local)) last = local;
    if (uid) {
      const remote = await getLastSocialVisit(uid);
      if (remote && remote > last) {
        last = remote;
        localStorage.setItem('socialLastVisit', String(remote));
      }
    }
    const newest = await getNewestPromptTimestamp();
    if (newest && newest > last) socialBadge.classList.remove('hidden');
    else socialBadge.classList.add('hidden');
  } catch (err) {
    console.error('Failed to check new prompts:', err);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.stopInit) return;
  initializeApp();
  notificationBtn = document.getElementById('notifications-btn');
  notificationCountEl = document.getElementById('notification-count');
  notificationsPanel = document.getElementById('notifications-panel');

  notificationBtn?.addEventListener('click', () => {
    notificationsPanel?.classList.toggle('hidden');
  });

  checkForNewPrompts();

  onAuth((user) => {
    appState.currentUser = user;
    if (!user) {
      notifications = [];
      renderNotifications();
      unsubscribeNotifications?.();
      checkForNewPrompts();
      return;
    }
    initNotifications(user.uid);
    checkForNewPrompts(user.uid);
  });
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
  setTimeout(hideEmptyAdSlots, 4000);
});

