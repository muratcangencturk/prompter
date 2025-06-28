import { onAuth } from './auth.js';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db, withRetry } from './firebase.js';

const MAX_MESSAGE_LENGTH = 500;
const MAX_NAME_LENGTH = 50;
// Allow letters, numbers, punctuation and whitespace
const allowedChars = /^[\p{L}\p{N}\p{P}\p{Zs}]+$/u;

const sanitizeText = (str) => str.replace(/[<>]/g, '');

const isValidInput = (str, maxLen) =>
  !!str && str.length <= maxLen && allowedChars.test(str);

let currentUser = null;
let unsubscribeMsgs = null;

const convListEl = document.getElementById('conv-list');
const messagesEl = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const createConvBtn = document.getElementById('create-conv');

const renderConversations = (convs) => {
  convListEl.innerHTML = '';
  convs.forEach((c) => {
    const li = document.createElement('li');
    li.textContent = c.name || c.id;
    li.className = 'cursor-pointer p-1 rounded hover:bg-white/20';
    li.addEventListener('click', () => openConversation(c.id));
    convListEl.appendChild(li);
  });
};

const listenConversations = (uid) => {
  const q = query(
    collection(db, 'conversations'),
    where('members', 'array-contains', uid),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    renderConversations(data);
  });
};

const openConversation = (convId) => {
  messageForm.dataset.convId = convId;
  messagesEl.innerHTML = '';
  unsubscribeMsgs?.();
  const q = query(
    collection(db, `conversations/${convId}/messages`),
    orderBy('createdAt', 'asc')
  );
  unsubscribeMsgs = onSnapshot(q, (snap) => {
    messagesEl.innerHTML = '';
    snap.docs.forEach((d) => {
      const m = d.data();
      const div = document.createElement('div');
      div.textContent = `${m.userId}: ${m.text}`;
      messagesEl.appendChild(div);
    });
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });
};

messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const convId = messageForm.dataset.convId;
  const text = messageInput.value.trim();
  if (!convId || !text) return;
  if (!isValidInput(text, MAX_MESSAGE_LENGTH)) {
    alert('Message contains invalid characters or is too long.');
    return;
  }
  const cleanText = sanitizeText(text);
  await withRetry(() =>
    addDoc(collection(db, `conversations/${convId}/messages`), {
      text: cleanText,
      userId: currentUser.uid,
      createdAt: serverTimestamp(),
    })
  );
  messageInput.value = '';
});

createConvBtn.addEventListener('click', async () => {
  if (!currentUser) return;
  const name = prompt('Group name');
  if (name && !isValidInput(name.trim(), MAX_NAME_LENGTH)) {
    alert('Conversation name contains invalid characters or is too long.');
    return;
  }
  const membersRaw = prompt('Comma-separated user IDs');
  if (!membersRaw) return;
  const members = Array.from(
    new Set(
      [currentUser.uid, ...membersRaw.split(',').map((m) => m.trim()).filter(Boolean)]
    )
  );
  await withRetry(() =>
    addDoc(collection(db, 'conversations'), {
      name: name ? sanitizeText(name.trim()) : '',
      members,
      createdBy: currentUser.uid,
      createdAt: serverTimestamp(),
    })
  );
});

onAuth((user) => {
  currentUser = user;
  if (!user) return;
  listenConversations(user.uid);
});
