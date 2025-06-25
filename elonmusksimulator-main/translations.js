export const dictionaries = {
  en: {
    title: 'ELON MUSK SIMULATOR',
    subtitle: 'This is Elon Musk!',
    gameOverTitle: 'Game Over: Elon has lost interest in you...',
    gameOverMessage: "Your decisions have led to a catastrophic failure in one of Elon's ventures.",
    swipeInstruction: '\u2190 swipe left or right to answer \u2192',
    tryAgain: 'Try Again',
    quit: 'Quit',
    score: 'Score',
    bestScore: 'Best',
    share: 'Share'
  },
  tr: {
    title: 'ELON MUSK SIM\u00dcLAT\u00d6R\u00dc',
    subtitle: 'Bu Elon Musk!',
    gameOverTitle: 'Oyun Bitti: Elon artik seninle ilgilenmiyor...',
    gameOverMessage: 'Kararlar\u0131n Elon\'un girisimlerinden birinde felakete yol acti.',
    swipeInstruction: '\u2190 cevaplamak icin sola ya da saga kaydir \u2192',
    tryAgain: 'Tekrar Dene',
    quit: 'Cik',
    score: 'Skor',
    bestScore: 'En Iyi',
    share: 'Paylas'
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

export function t(key) {
  return dictionaries[currentLang][key] || key;
}

export function setLanguage(lang) {
  if (dictionaries[lang]) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    updateTexts();
  }
}

export function getLanguage() {
  return currentLang;
}

export function updateTexts() {
  const titleEl = document.getElementById('title');
  if (titleEl) titleEl.textContent = t('title');

  const subtitleEl = document.getElementById('subtitle');
  if (subtitleEl) subtitleEl.textContent = t('subtitle');

  document.title = t('title');

  const goTitle = document.getElementById('game-over-title');
  if (goTitle) goTitle.textContent = t('gameOverTitle');

  const goMsg = document.getElementById('game-over-message');
  if (goMsg) goMsg.textContent = t('gameOverMessage');

  const restartBtn = document.getElementById('restart-button');
  if (restartBtn) restartBtn.textContent = t('tryAgain');

  const shareBtn = document.getElementById('share-button');
  if (shareBtn) shareBtn.textContent = t('share');

  const quitBtn = document.getElementById('quit-button');
  if (quitBtn) quitBtn.textContent = t('quit');

  const scoreLabel = document.getElementById('score-label');
  if (scoreLabel) scoreLabel.textContent = t('score') + ':';

  const bestLabel = document.getElementById('best-score-label');
  if (bestLabel) bestLabel.textContent = t('bestScore') + ':';
}

export function initI18n() {
  updateTexts();
}
