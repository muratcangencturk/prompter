document.addEventListener('DOMContentLoaded', () => {
  const cdnScripts = [
    '//complete-drink.com/bsXRVnsld.G/lB0gYzWocl/_eXm/9uu_ZSUjlMkYPFT/Y_0dMezpUI2/NvzCUot/NzjUQYzDNMTVYS3INKgF',
    '//complete-drink.com/b/XxV.sydBGBlg0zYGWIcx/ceAmE9juAZGU/l-k/PwTJYB0WMEzIUM4SMETjYIteNfjHQLzENzTRgdxxNewE',
    '//complete-drink.com/bgX.VEsydqGplf0UYIWCc-/me/mn9cubZxUEl/kMP/TiYT0oMNz/Ud4NMpjIY-tQNFjbQozHNrT_gfy/NawS'
  ];

  cdnScripts.forEach((src) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';
    document.body.appendChild(s);
  });

  const profitSrc = '//pl26937665.profitableratecpm.com/a1f7e9c6d98927233c3bdba5a0b35b69/invoke.js';
  const ps = document.createElement('script');
  ps.src = profitSrc;
  ps.async = true;
  ps.dataset.cfasync = 'false';
  document.body.appendChild(ps);
});
