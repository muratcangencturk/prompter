(function () {
  const adLinks = [
    "https://otieu.com/4/9495321",
    "https://otieu.com/4/9495319",
    "https://otieu.com/4/9495318",
    "https://otieu.com/4/9497116",
  ];

  const delayMinutes = [2, 3, 4];

  function scheduleAd() {
    if (sessionStorage.getItem('adShown')) return;

    const adUrl = adLinks[Math.floor(Math.random() * adLinks.length)];
    const wait =
      delayMinutes[Math.floor(Math.random() * delayMinutes.length)] * 60000;

    sessionStorage.setItem('adShown', 'yes');

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
