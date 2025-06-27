(function () {
  const adLinks = [
    'https://otieu.com/4/9495321',
    'https://otieu.com/4/9495319',
    'https://otieu.com/4/9495318',
    'https://otieu.com/4/9497116',
  ];

  const delayMinutes = [2, 3, 4];

  // Attempt to interact with sessionStorage and fall back to a global
  // flag when storage is unavailable (e.g. in private mode or restricted
  // environments). The flag ensures the ad only opens once per session.
  let storageAvailable = true;

  function canUseSessionStorage() {
    try {
      const testKey = '__storage_test__';
      sessionStorage.setItem(testKey, '1');
      sessionStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  storageAvailable = canUseSessionStorage();

  function scheduleAd() {
    if (storageAvailable) {
      try {
        if (sessionStorage.getItem('adShown')) return;
      } catch (e) {
        storageAvailable = false;
      }
    } else if (window.__adShownFallback) {
      return;
    }

    const adUrl = adLinks[Math.floor(Math.random() * adLinks.length)];
    const wait =
      delayMinutes[Math.floor(Math.random() * delayMinutes.length)] * 60000;

    if (storageAvailable) {
      try {
        sessionStorage.setItem('adShown', 'yes');
      } catch (e) {
        storageAvailable = false;
        window.__adShownFallback = true;
      }
    } else {
      window.__adShownFallback = true;
    }

    setTimeout(() => {
      window.open(adUrl, '_blank', 'noopener');
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
