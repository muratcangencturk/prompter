class LocalStorageMock {
  constructor() { this.store = {}; }
  getItem(key) { return this.store[key] || null; }
  setItem(key, value) { this.store[key] = String(value); }
}

test('save and load high score', async () => {
  const { loadHighScore, saveHighScore } = await import('../score.mjs');
  const storage = new LocalStorageMock();
  saveHighScore(7, storage);
  expect(storage.getItem('highScore')).toBe('7');
  const loaded = loadHighScore(storage);
  expect(loaded).toBe(7);
});

test('loadHighScore returns 0 when empty', async () => {
  const { loadHighScore } = await import('../score.mjs');
  const storage = new LocalStorageMock();
  expect(loadHighScore(storage)).toBe(0);
});
