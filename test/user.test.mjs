import assert from 'assert';
import runTest from './runTest.js';
import { reset as resetFs, _state } from './mocks/firestore.js';
import { loadModule } from './loadModule.js';

await runTest('setUserProfile stores profile info', async () => {
  resetFs();
  const { setUserProfile, getUserProfile } = await loadModule('src/user.js');
  await setUserProfile('u1', { name: 'Alice', email: 'a@example.com', bio: 'hi' });
  const profile = await getUserProfile('u1');
  assert.strictEqual(profile.name, 'Alice');
  assert.strictEqual(profile.email, 'a@example.com');
  assert.strictEqual(profile.bio, 'hi');
});

await runTest('follow and unfollow user', async () => {
  resetFs();
  const { followUser, unfollowUser, isFollowing, getFollowerIds, getFollowingIds } = await loadModule('src/user.js');
  await followUser('u1', 'u2');
  assert.strictEqual(await isFollowing('u1', 'u2'), true);
  assert.deepStrictEqual(await getFollowingIds('u1'), ['u2']);
  assert.deepStrictEqual(await getFollowerIds('u2'), ['u1']);
  await unfollowUser('u1', 'u2');
  assert.strictEqual(await isFollowing('u1', 'u2'), false);
});
