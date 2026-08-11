(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== HEADER =====
  const header = document.querySelector('.header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== MOBILE NAV =====
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  // ===== SCROLL REVEAL =====
  if (!prefersReducedMotion) {
    const els = document.querySelectorAll('.reveal:not([data-loop]), .reveal-left:not([data-loop]), .reveal-right:not([data-loop])');
    if (els.length) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
      els.forEach(el => io.observe(el));

      // Safety net, mobile only: if the observer's callback lags behind the
      // user's scroll (main thread busy elsewhere), an element can already
      // be on-screen and still sit stuck at opacity:0. After a short delay,
      // force-reveal anything that's already on or past screen — sections
      // still below the fold are left alone, so the scroll-reveal effect
      // itself is untouched either way.
      if (window.matchMedia('(max-width: 900px)').matches) {
        setTimeout(() => {
          els.forEach(el => {
            if (!el.classList.contains('visible') && el.getBoundingClientRect().top < window.innerHeight) {
              el.classList.add('visible');
              io.unobserve(el);
            }
          });
        }, 1500);
      }
    }

    // [data-loop] elements animate back out on the way past too, instead
    // of staying revealed forever once first seen.
    const loopEls = document.querySelectorAll('[data-loop]');
    if (loopEls.length) {
      const loopIo = new IntersectionObserver(entries => {
        entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting));
      }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
      loopEls.forEach(el => loopIo.observe(el));
    }
  }

  // ===== HERO WORD ANIMATION =====
  // Wraps on innerHTML (not textContent) so single-word <em> emphasis
  // (e.g. "<em>seu</em>") survives the wrap instead of being flattened.
  let firstHeadlineWrap = true;

  window.__ikigaiWrapHeadline = function() {
    const h = document.querySelector('.hero__headline');
    if (!h || prefersReducedMotion) return;
    const raw = h.innerHTML;
    const animate = firstHeadlineWrap;
    firstHeadlineWrap = false;
    h.innerHTML = raw.replace(/(\S+)/g, (m) =>
      '<span class="word' + (animate ? '' : ' visible') + '">' + m + '</span>'
    );
    if (animate) {
      h.querySelectorAll('.word').forEach((w, i) =>
        setTimeout(() => w.classList.add('visible'), 150 + i * 70)
      );
    }
  };

  // ===== COPYRIGHT YEAR =====
  // Set unconditionally, outside any data-i18n span, so it survives i18n
  // applying translated footer text via textContent.
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();

  if (!prefersReducedMotion) {
    ['.hero__sub', '.hero__cta'].forEach((sel, i) => {
      const el = document.querySelector(sel);
      if (!el) return;
      Object.assign(el.style, {
        opacity: '0', transform: 'translateY(20px)',
        transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)'
      });
      setTimeout(() => Object.assign(el.style, { opacity: '1', transform: 'translateY(0)' }), 700 + i * 200);
    });
  }

  // ===== FORM =====
  // Submits to Web3Forms (api.web3forms.com) — the site is static (GitHub
  // Pages), so this is the only backend. access_key lives as a hidden field
  // in contato.html, per Web3Forms' own integration model (it's a public
  // per-site key, not a secret).
  const form = document.querySelector('.form');
  if (form) {
    const submitBtn = form.querySelector('.form__submit');
    const successBox = document.querySelector('.form__success');
    const errorBox = document.querySelector('.form__error-banner');

    form.addEventListener('submit', async e => {
      e.preventDefault();
      errorBox?.classList.remove('visible');

      let valid = true;
      form.querySelectorAll('[required]').forEach(f => {
        const p = f.closest('.form__field');
        if (!f.value.trim()) { p.classList.add('has-error'); f.classList.add('error'); valid = false; }
        else { p.classList.remove('has-error'); f.classList.remove('error'); }
      });
      const email = form.querySelector('[type="email"]');
      if (email?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.closest('.form__field').classList.add('has-error');
        email.classList.add('error'); valid = false;
      }
      if (!valid) return;

      const idleLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = window.__ikigaiT?.('contact.form.submitting') || idleLabel;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.success) throw new Error(data?.message || 'submit failed');

        form.style.display = 'none';
        successBox?.classList.add('visible');
        form.reset();
      } catch {
        errorBox?.classList.add('visible');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = idleLabel;
      }
    });
    form.querySelectorAll('[required]').forEach(f =>
      f.addEventListener('input', () => {
        if (f.value.trim()) { f.closest('.form__field').classList.remove('has-error'); f.classList.remove('error'); }
      })
    );

    // "Send another message" — bring the form back after a successful send.
    document.querySelector('.form__success-reset')?.addEventListener('click', () => {
      successBox?.classList.remove('visible');
      form.style.display = '';
    });
  }

  // ===== SPOTLIGHT CARDS (roster) =====
  // Tracks the pointer per-card (not viewport-wide) and writes its position
  // as CSS custom properties the .roster-card::before gradient reads —
  // the one idea worth keeping from a React "glow card" reference, minus
  // the framework and the rainbow hue-shift.
  if (!prefersReducedMotion) {
    document.querySelectorAll('.roster-card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
        card.style.setProperty('--spot-y', ((e.clientY - rect.top) / rect.height * 100) + '%');
      });
    });
  }

  // ===== CHECKLIST STAGGER =====
  // Numbers each list's items so the CSS transition-delay cascades them in
  // one after another, instead of the whole checklist fading in as one block.
  document.querySelectorAll('.checklist').forEach(list => {
    list.querySelectorAll(':scope > .checklist__item').forEach((item, i) => {
      item.style.setProperty('--i', i);
    });
  });

  // ===== ACTIVE NAV =====
  // Pages link to each other via clean paths ("quem-somos", not
  // "quem-somos.html") since GitHub Pages serves both; stripping .html here
  // keeps this working if a visitor lands on the old-style URL directly.
  const path = window.location.pathname.replace(/\.html$/, '');
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    const isActive = href === '/' ? (path === '/' || path === '') : path.endsWith(href);
    if (isActive) a.classList.add('active');
  });
})();
