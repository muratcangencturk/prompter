import assert from 'assert';
import runTest from './runTest.js';
import { reset as resetFs, _state, calls as fsCalls } from './mocks/firestore.js';
import { reset as resetNotif, calls as notifCalls } from './mocks/notifications.js';
import { loadModule } from './loadModule.js';

await runTest('savePrompt adds new document when none exists', async () => {
  resetFs();
  resetNotif();
  const { savePrompt } = await loadModule('src/prompt.js');
  await savePrompt('hello', 'u1');
  const prompt = Object.values(_state).find((d) => d.text === 'hello');
  assert(prompt);
  assert.strictEqual(prompt.userId, 'u1');
  assert.strictEqual(prompt.shareCount, 1);
});

await runTest('savePrompt updates existing prompt', async () => {
  resetFs();
  resetNotif();
  const { collection, addDoc, doc: docFn } = await import('./mocks/firestore.js');
  const ref = await addDoc(collection(null, 'prompts'), { text: 'hi', userId: 'u2', shareCount: 1, sharedBy: [] });
  const { savePrompt } = await loadModule('src/prompt.js');
  await savePrompt('hi', 'u2', 'cat');
  const updated = _state[ref.path];
  assert.strictEqual(updated.shareCount, 2);
  assert.deepStrictEqual(updated.sharedBy, ['u2']);
  assert.strictEqual(fsCalls.updateDoc.length, 1);
});

await runTest('likePrompt notifies owner when liked by others', async () => {
  resetFs();
  resetNotif();
  const { collection, addDoc } = await import('./mocks/firestore.js');
  const { sendNotification } = await import('./mocks/notifications.js');
  const docRef = await addDoc(collection(null, 'prompts'), { userId: 'owner1', likes: 0, likedBy: [] });
  const { likePrompt } = await loadModule('src/prompt.js');
  await likePrompt(docRef.id, 'user2');
  const updated = _state[docRef.path];
  assert.strictEqual(updated.likes, 1);
  assert.deepStrictEqual(updated.likedBy, ['user2']);
  assert.strictEqual(notifCalls.length, 1);
  assert.deepStrictEqual(notifCalls[0], ['owner1', { type: 'like', promptId: docRef.id, from: 'user2' }]);
});

await runTest('addComment stores comment and notifies owner', async () => {
  resetFs();
  resetNotif();
  const { collection, addDoc } = await import('./mocks/firestore.js');
  const promptRef = await addDoc(collection(null, 'prompts'), { userId: 'owner2', commentCount: 0 });
  const { addComment } = await loadModule('src/prompt.js');
  await addComment(promptRef.id, 'user3', 'nice');
  const commentPath = `prompts/${promptRef.id}/comments`;
  const comment = Object.entries(_state).find(([p]) => p.startsWith(commentPath));
  assert(comment, 'comment created');
  const updatedPrompt = _state[promptRef.path];
  assert.strictEqual(updatedPrompt.commentCount, 1);
  assert.strictEqual(notifCalls.length, 1);
  assert.deepStrictEqual(notifCalls[0], ['owner2', { type: 'comment', promptId: promptRef.id, from: 'user3' }]);
});
