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
  await withRetry(() =>
    addDoc(collection(db, `conversations/${convId}/messages`), {
      text,
      userId: currentUser.uid,
      createdAt: serverTimestamp(),
    })
  );
  messageInput.value = '';
});

createConvBtn.addEventListener('click', async () => {
  if (!currentUser) return;
  const name = prompt('Group name');
  const membersRaw = prompt('Comma-separated user IDs');
  if (!membersRaw) return;
  const members = Array.from(
    new Set(
      [currentUser.uid, ...membersRaw.split(',').map((m) => m.trim()).filter(Boolean)]
    )
  );
  await withRetry(() =>
    addDoc(collection(db, 'conversations'), {
      name: name || '',
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
