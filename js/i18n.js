(() => {
  'use strict';

  const DEFAULT_LANG = 'pt';
  const SUPPORTED = ['pt', 'en', 'it'];
  const cache = {};

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
      const base = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
      const res = await fetch(base + 'i18n/' + lang + '.json');
      if (!res.ok) return null;
      cache[lang] = await res.json();
      return cache[lang];
    } catch {
      return null;
    }
  }

  function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (!translations[key]) return;

      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[key];
      } else if (el.dataset.i18nAttr) {
        el.setAttribute(el.dataset.i18nAttr, translations[key]);
      } else {
        el.textContent = translations[key];
      }
    });

    if (window.__ikigaiWrapHeadline) window.__ikigaiWrapHeadline(false);

    document.documentElement.lang = getSavedLang() === 'pt' ? 'pt-BR' : getSavedLang();
  }

  function updateSwitcher(lang) {
    document.querySelectorAll('.lang-switch__btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
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
