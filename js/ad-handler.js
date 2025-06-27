(function () {
  const adLinks = [
    'https://otieu.com/4/9495321',
    'https://otieu.com/4/9495319',
    'https://otieu.com/4/9495318',
    'https://otieu.com/4/9497116',
  ];

  const delayMinutes = [2, 3, 4];

  function scheduleAd() {
    // If sessionStorage previously failed, rely on a global flag to prevent
    // repeated attempts and duplicate ads.
    if (window.__adShownFallback) return;

    try {
      if (sessionStorage.getItem('adShown')) return;
      sessionStorage.setItem('adShown', 'yes');
    } catch {
      // sessionStorage may be unavailable (incognito mode, old browsers, etc.).
      // Mark with a fallback flag so future calls skip trying again.
      window.__adShownFallback = true;
    }

    const adUrl = adLinks[Math.floor(Math.random() * adLinks.length)];
    const wait =
      delayMinutes[Math.floor(Math.random() * delayMinutes.length)] * 60000;

    setTimeout(() => {
      window.open(adUrl, '_blank', 'noopener,noreferrer');
    }, wait);
  }

  function activateOnInteraction() {
    document.addEventListener('scroll', scheduleAd, { once: true });
    document.addEventListener('click', scheduleAd, { once: true });
  }

  if (document.readyState === 'complete') {
    activateOnInteraction();
  } else {
    window.addEventListener('load', activateOnInteraction);
  }
})();
