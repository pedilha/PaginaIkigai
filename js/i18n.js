(() => {
  'use strict';

  const DEFAULT_LANG = 'pt';
  const SUPPORTED = ['pt', 'en', 'it'];
  const cache = {};

  // Pasta i18n/ resolvida a partir deste arquivo (js/i18n.js), não da URL da
  // página: a 404 é servida pelo GitHub Pages em qualquer caminho
  // (ex.: /blog/post-antigo), onde "./i18n/" apontaria para o lugar errado.
  const scriptSrc = document.currentScript && document.currentScript.src;
  const I18N_BASE = scriptSrc
    ? new URL('../i18n/', scriptSrc).href
    : window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'i18n/';

  function getSavedLang() {
    try { return localStorage.getItem('ikigai-lang') || DEFAULT_LANG; }
    catch { return DEFAULT_LANG; }
  }

  function saveLang(lang) {
    try { localStorage.setItem('ikigai-lang', lang); } catch {}
  }

  async function loadTranslations(lang) {
    if (cache[lang]) return cache[lang];
    try {
      const res = await fetch(I18N_BASE + lang + '.json');
      if (!res.ok) return null;
      cache[lang] = await res.json();
      return cache[lang];
    } catch {
      return null;
    }
  }

  function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n], [data-i18n-html]').forEach(el => {
      const key = el.dataset.i18n || el.dataset.i18nHtml;
      if (!translations[key]) return;

      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[key];
      } else if (el.dataset.i18nAttr) {
        el.setAttribute(el.dataset.i18nAttr, translations[key]);
      } else if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = translations[key];
      } else {
        el.textContent = translations[key];
      }
    });

    if (window.__ikigaiWrapHeadline) window.__ikigaiWrapHeadline(false);

    document.documentElement.lang = getSavedLang() === 'pt' ? 'pt-BR' : getSavedLang();
  }

  // Lets other scripts (main.js's form handler) read a translated string for
  // the current language without duplicating the fetch/cache logic here.
  window.__ikigaiT = function(key) {
    const lang = getSavedLang();
    return cache[lang]?.[key];
  };

  function updateSwitcher(lang) {
    document.querySelectorAll('.lang-switch__btn').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  async function setLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    saveLang(lang);
    const t = await loadTranslations(lang);
    if (t) {
      applyTranslations(t);
      updateSwitcher(lang);
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    document.querySelectorAll('.lang-switch__btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });

    const lang = getSavedLang();
    await setLang(lang);
  });
})();
