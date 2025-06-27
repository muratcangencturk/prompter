(function () {
  const adLinks = [
    'https://otieu.com/4/9495321',
    'https://otieu.com/4/9495319',
    'https://otieu.com/4/9495318',
    'https://otieu.com/4/9497116',
  ];

  const delayMinutes = [2, 3, 4];

  function scheduleAd() {
    // If accessing sessionStorage previously failed, rely on a global flag to
    // avoid repeated errors and to ensure the ad only appears once.
    if (window.__adShownFallback) return;

    let storageFailed = false;
    try {
      const alreadyShown = sessionStorage.getItem('adShown');
      if (alreadyShown) return;
      sessionStorage.setItem('adShown', 'yes');
    } catch (err) {
      // Accessing sessionStorage can throw in some environments (e.g.
      // incognito mode or restrictive browser settings).
      storageFailed = true;
    }

    if (storageFailed) {
      // Remember the failure so subsequent calls don't attempt sessionStorage
      // again. The flag also prevents duplicate ads during this page load when
      // persistence isn't available.
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
