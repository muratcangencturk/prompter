export function loadHighScore(storage = localStorage) {
  const val = storage.getItem('highScore');
  return val ? parseInt(val, 10) : 0;
}

export function saveHighScore(score, storage = localStorage) {
  storage.setItem('highScore', String(score));
}
