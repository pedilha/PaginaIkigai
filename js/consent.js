(() => {
  'use strict';

  // TODO: substituir pelos IDs reais assim que as contas forem criadas.
  const GA4_ID = 'G-XXXXXXXXXX';
  const CLARITY_ID = 'XXXXXXXXXX';

  const STORAGE_KEY = 'ikigai-cookie-consent';

  function loadGA4() {
    if (GA4_ID.includes('X')) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID);
  }

  function loadClarity() {
    if (CLARITY_ID.includes('X')) return;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }

  function loadTrackingScripts() {
    loadGA4();
    loadClarity();
  }

  const stored = (() => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  })();

  if (stored === 'accepted') {
    loadTrackingScripts();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.cookie-consent');
    if (!banner) return;

    if (!stored) {
      banner.hidden = false;
    }

    banner.querySelector('.cookie-consent__accept')?.addEventListener('click', () => {
      try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch {}
      banner.hidden = true;
      loadTrackingScripts();
    });

    banner.querySelector('.cookie-consent__decline')?.addEventListener('click', () => {
      try { localStorage.setItem(STORAGE_KEY, 'declined'); } catch {}
      banner.hidden = true;
    });
  });
})();
