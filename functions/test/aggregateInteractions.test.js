const assert = require('assert');
const { aggregateInteractions } = require('../index');

const prompts = [
  { data: () => ({ likedBy: ['u1', 'u2'], sharedBy: ['u2'] }) },
  { data: () => ({ likedBy: ['u1'], sharedBy: [] }) },
];

const savedDocs = [
  { ref: { parent: { parent: { id: 'u1' } } } },
  { ref: { parent: { parent: { id: 'u2' } } } },
  { ref: { parent: { parent: { id: 'u1' } } } },
];

const { likes, shares, saves } = aggregateInteractions(prompts, savedDocs);
assert.deepStrictEqual(likes, { u1: 2, u2: 1 });
assert.deepStrictEqual(shares, { u2: 1 });
assert.deepStrictEqual(saves, { u1: 2, u2: 1 });

console.log('aggregateInteractions tests passed');
