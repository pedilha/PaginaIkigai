(() => {
  'use strict';

  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  const SESSION_KEY = 'ikigai-intro-shown';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let alreadyShown = false;
  try { alreadyShown = sessionStorage.getItem(SESSION_KEY) === '1'; } catch {}

  if (prefersReducedMotion || alreadyShown) {
    overlay.remove();
    return;
  }

  try { sessionStorage.setItem(SESSION_KEY, '1'); } catch {}
  document.body.classList.add('intro-active');

  const video = overlay.querySelector('video');
  // <source media="..."> inside <video> isn't reliably honored across real
  // mobile browsers the way it is for <picture> — pick the file explicitly
  // in JS instead, which every browser handles the same way.
  if (video) {
    const isMobile = window.matchMedia('(max-width: 700px)').matches;
    video.src = isMobile ? video.dataset.srcMobile : video.dataset.srcDesktop;
    video.load();
    // Setting .src via script doesn't reliably re-trigger the autoplay
    // attribute's built-in behavior on iOS Safari — has to call .play()
    // explicitly. If it's still rejected for some other reason, just skip
    // straight to dismissing instead of leaving a paused video on screen.
    video.play().catch(() => dismiss());
  }
  let dismissed = false;

  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    overlay.classList.add('intro-overlay--hidden');
    document.body.classList.remove('intro-active');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
    // Fallback removal in case transitionend never fires (e.g. tab was backgrounded).
    setTimeout(() => overlay.remove(), 900);
  }

  video?.addEventListener('ended', dismiss);

  // Autoplay can be blocked by the browser, or the video can fail to load —
  // never trap the visitor behind the overlay waiting for an event that
  // might not come.
  setTimeout(dismiss, 5000);
})();
