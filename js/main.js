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
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (els.length) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
      els.forEach(el => io.observe(el));
    }
  }

  // ===== HERO WORD ANIMATION =====
  let firstHeadlineWrap = true;

  window.__ikigaiWrapHeadline = function() {
    const h = document.querySelector('.hero__headline');
    if (!h || prefersReducedMotion) return;
    const raw = h.textContent;
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

  // ===== PARALLAX =====
  if (!prefersReducedMotion) {
    const pEls = document.querySelectorAll('.banner__bg--parallax');
    if (pEls.length) {
      let ticking = false;
      const pIo = new IntersectionObserver(entries =>
        entries.forEach(e => e.target.dataset.active = e.isIntersecting ? '1' : '0')
      );
      pEls.forEach(el => pIo.observe(el));
      window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          pEls.forEach(el => {
            if (el.dataset.active !== '1') return;
            const rect = el.parentElement.getBoundingClientRect();
            el.style.transform = `translateY(${(rect.top - window.innerHeight * 0.5) * 0.12}px) scale(1.12)`;
          });
          ticking = false;
        });
      }, { passive: true });
    }
  }

  // ===== PORTFOLIO DRAG =====
  document.querySelectorAll('.portfolio-scroll').forEach(c => {
    let down = false, sx, sl;
    c.addEventListener('mousedown', e => { down = true; sx = e.pageX - c.offsetLeft; sl = c.scrollLeft; });
    c.addEventListener('mouseleave', () => down = false);
    c.addEventListener('mouseup', () => down = false);
    c.addEventListener('mousemove', e => {
      if (!down) return;
      e.preventDefault();
      c.scrollLeft = sl - (e.pageX - c.offsetLeft - sx) * 1.5;
    });
  });

  // ===== FAN CAROUSEL =====
  const fanStage = document.querySelector('.fan__stage');
  if (fanStage) {
    const cards = Array.from(fanStage.querySelectorAll('.fan__card'));
    const total = cards.length;
    const dotsContainer = document.querySelector('.fan__dots');
    let center = Math.floor(total / 2);
    let animating = false;

    const FAN = [
      { rot: -18, scale: 0.78, x: -220, y: 30, z: 1, opacity: 0.4 },
      { rot: -9,  scale: 0.88, x: -120, y: 12, z: 2, opacity: 0.7 },
      { rot: 0,   scale: 1,    x: 0,    y: 0,  z: 10, opacity: 1 },
      { rot: 9,   scale: 0.88, x: 120,  y: 12, z: 2, opacity: 0.7 },
      { rot: 18,  scale: 0.78, x: 220,  y: 30, z: 1, opacity: 0.4 },
    ];

    function getMultiplier() {
      const w = window.innerWidth;
      if (w < 400) return 0.32;
      if (w < 480) return 0.38;
      if (w < 640) return 0.5;
      if (w < 768) return 0.6;
      if (w < 1024) return 0.8;
      return 1;
    }

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.className = 'fan__dot' + (i === center ? ' active' : '');
        dotsContainer.appendChild(dot);
      }
    }

    function layout(animate) {
      const m = getMultiplier();
      const half = Math.floor(FAN.length / 2);

      cards.forEach((card, i) => {
        const offset = i - center;
        const slotIndex = offset + half;

        if (slotIndex < 0 || slotIndex >= FAN.length) {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
          card.style.zIndex = '0';
          card.style.transform = `translateX(${offset > 0 ? 300 : -300}px) scale(0.5) rotate(${offset > 0 ? 25 : -25}deg)`;
          return;
        }

        const slot = FAN[slotIndex];
        card.style.transform = `translateX(${slot.x * m}px) translateY(${slot.y * m}px) rotate(${slot.rot}deg) scale(${slot.scale})`;
        card.style.opacity = String(slot.opacity);
        card.style.zIndex = String(slot.z);
        card.style.pointerEvents = slotIndex === half ? 'auto' : 'auto';
      });

      if (dotsContainer) {
        dotsContainer.querySelectorAll('.fan__dot').forEach((d, i) => {
          d.classList.toggle('active', i === center);
        });
      }
    }

    function cycle(dir) {
      if (animating) return;
      animating = true;
      center = dir === 'right'
        ? (center + 1) % total
        : (center - 1 + total) % total;
      layout(true);
      setTimeout(() => { animating = false; }, 600);
    }

    buildDots();
    layout(false);

    document.querySelectorAll('.fan__btn').forEach(btn => {
      btn.addEventListener('click', () => cycle(btn.dataset.fanDir));
    });

    // Hover: lift hovered card
    cards.forEach((card, i) => {
      card.addEventListener('mouseenter', () => {
        if (animating) return;
        const offset = i - center;
        const half = Math.floor(FAN.length / 2);
        const slotIndex = offset + half;
        if (slotIndex < 0 || slotIndex >= FAN.length) return;
        const slot = FAN[slotIndex];
        const m = getMultiplier();
        card.style.transform = `translateX(${slot.x * m}px) translateY(${(slot.y - 15) * m}px) rotate(${slot.rot}deg) scale(${slot.scale * 1.05})`;
        card.style.zIndex = '20';
      });
      card.addEventListener('mouseleave', () => {
        if (animating) return;
        layout(false);
      });
      card.addEventListener('click', () => {
        if (i !== center && !animating) {
          center = i;
          animating = true;
          layout(true);
          setTimeout(() => { animating = false; }, 600);
          if (dotsContainer) {
            dotsContainer.querySelectorAll('.fan__dot').forEach((d, j) => {
              d.classList.toggle('active', j === center);
            });
          }
        }
      });
    });

    window.addEventListener('resize', () => layout(false));

    // Touch swipe
    let touchStartX = 0;
    fanStage.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    fanStage.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 50) cycle(diff < 0 ? 'right' : 'left');
    });
  }

  // ===== FORM =====
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
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
      form.style.display = 'none';
      document.querySelector('.form__success')?.classList.add('visible');
    });
    form.querySelectorAll('[required]').forEach(f =>
      f.addEventListener('input', () => {
        if (f.value.trim()) { f.closest('.form__field').classList.remove('has-error'); f.classList.remove('error'); }
      })
    );
  }

  // ===== ACTIVE NAV =====
  const path = window.location.pathname;
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (path.endsWith(href) || (href === 'index.html' && (path.endsWith('/') || path.endsWith('index.html')))) {
      a.classList.add('active');
    }
  });
})();
