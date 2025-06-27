// Ad handler that opens a random ad link after the first user interaction.
// Uses sessionStorage when available and falls back to a temporary variable
// so the ad only appears once per session.
(function () {
  const adLinks = [
    'https://otieu.com/4/9495321',
    'https://otieu.com/4/9495319',
    'https://otieu.com/4/9495318',
    'https://otieu.com/4/9497116'
  ];

  const delayMinutes = [2, 3, 4];
  let adScheduled = false;

  function scheduleAd() {
    if (adScheduled) return;
    adScheduled = true;

    try {
      if (sessionStorage.getItem('adShown')) return;
      sessionStorage.setItem('adShown', 'yes');
    } catch {
      if (window.__adShownFallback) return;
      window.__adShownFallback = true;
    }

    const wait =
      delayMinutes[Math.floor(Math.random() * delayMinutes.length)] * 60000;

    setTimeout(() => {
      const adUrl = adLinks[Math.floor(Math.random() * adLinks.length)];
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
