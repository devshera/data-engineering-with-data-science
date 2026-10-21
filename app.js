// Curriculum — desktop sidebar tabs + mobile accordion
(function initCurriculum() {
  const nav    = document.querySelector('.curriculum__nav');
  const btns   = document.querySelectorAll('.curriculum__nav .cmod');
  const panels = document.querySelectorAll('.curriculum__panels .cpanel');
  if (!btns.length || !panels.length) return;

  const MOBILE_BP = 768;

  // ── Build accordion controls (injected once, shown only on mobile via CSS) ──
  panels.forEach(panel => {
    const srcBtn = document.querySelector(`.cmod[data-mod="${panel.dataset.panel}"]`);
    const num   = srcBtn ? srcBtn.querySelector('.cmod__num').textContent  : '';
    const title = srcBtn ? srcBtn.querySelector('.cmod__title').textContent : '';

    const accordBtn = document.createElement('button');
    accordBtn.type = 'button';
    accordBtn.className = 'cpanel__accord-btn';
    accordBtn.setAttribute('aria-expanded', 'false');
    accordBtn.innerHTML = `
      <span class="cpanel__accord-num">${num}</span>
      <span class="cpanel__accord-title">${title}</span>
      <span class="cpanel__accord-chevron" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </span>`;

    // Wrap existing panel children in collapsible shell
    const content = document.createElement('div');
    content.className = 'cpanel__content';
    const inner = document.createElement('div');
    inner.className = 'cpanel__content-inner';
    // Move all existing children into inner
    while (panel.firstChild) inner.appendChild(panel.firstChild);
    content.appendChild(inner);

    panel.prepend(accordBtn);
    panel.appendChild(content);

    accordBtn.addEventListener('click', () => {
      if (window.innerWidth > MOBILE_BP) return;
      const isOpen = panel.classList.contains('is-open');
      // Collapse all
      panels.forEach(p => {
        p.classList.remove('is-open');
        const b = p.querySelector('.cpanel__accord-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      // Open clicked if it was closed
      if (!isOpen) {
        panel.classList.add('is-open');
        accordBtn.setAttribute('aria-expanded', 'true');
        // Smooth scroll so header stays visible
        setTimeout(() => {
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      }
    });
  });

  // ── Desktop: sidebar tab switching ──
  function activateTab(id) {
    btns.forEach(b => b.classList.toggle('is-active', b.getAttribute('data-mod') === id));
    panels.forEach(p => p.classList.toggle('is-active', p.getAttribute('data-panel') === id));
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.getAttribute('data-mod')));
  });

  // ── On resize: sync state between modes ──
  let wasDesktop = window.innerWidth > MOBILE_BP;
  function handleResize() {
    const isDesktop = window.innerWidth > MOBILE_BP;
    if (isDesktop && !wasDesktop) {
      // Switched to desktop: ensure one tab is active
      const hasActive = [...panels].some(p => p.classList.contains('is-active'));
      if (!hasActive) activateTab('1');
    }
    if (!isDesktop && wasDesktop) {
      // Switched to mobile: open first panel if none open
      const hasOpen = [...panels].some(p => p.classList.contains('is-open'));
      if (!hasOpen) {
        panels[0].classList.add('is-open');
        const b = panels[0].querySelector('.cpanel__accord-btn');
        if (b) b.setAttribute('aria-expanded', 'true');
      }
    }
    wasDesktop = isDesktop;
  }

  window.addEventListener('resize', handleResize);

  // ── Initial state ──
  if (window.innerWidth > MOBILE_BP) {
    activateTab('1');
  } else {
    // Open first panel on mobile
    panels[0].classList.add('is-open');
    const b = panels[0].querySelector('.cpanel__accord-btn');
    if (b) b.setAttribute('aria-expanded', 'true');
  }
})();

// FAQ: close other items when one opens (accordion behavior)
(function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        items.forEach(other => {
          if (other !== item) other.open = false;
        });
      }
    });
  });
})();

// Modal system — handles both #modal-book and #modal-curriculum
(function initModals() {
  let activeModal = null;
  let lastFocus   = null;

  function openModal(modal, trigger) {
    if (activeModal) closeModal(activeModal);
    lastFocus = trigger || document.activeElement;
    activeModal = modal;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-lock');
    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-lock');
    activeModal = null;
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function setupModal(modalId) {
    const modal = document.getElementById('modal-' + modalId);
    if (!modal) return;

    document.querySelectorAll(`[data-modal-open="${modalId}"]`).forEach(btn => {
      btn.addEventListener('click', e => { e.preventDefault(); openModal(modal, btn); });
    });

    modal.querySelectorAll('[data-modal-close]').forEach(el => {
      el.addEventListener('click', () => closeModal(modal));
    });
  }

  ['book', 'curriculum'].forEach(setupModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeModal) closeModal(activeModal);
  });
})();

// Scroll progress bar
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

// 3D card tilt on hover
(function initTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.step-card, .feature, .project-card, .story-card, .rating-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(12px)`;
      card.style.boxShadow = `${-x * 12}px ${-y * 12}px 30px rgba(59,130,246,.12)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
})();

// Hero floating card parallax
(function initHeroParallax() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const hero  = document.querySelector('.hero');
  const cards = hero ? [...hero.querySelectorAll('.hero__card')] : [];
  if (!cards.length) return;

  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left  - r.width  / 2) / r.width;
    const y = (e.clientY - r.top   - r.height / 2) / r.height;
    cards.forEach((card, i) => {
      const d = (i + 1) * 10;
      card.style.transform = `translate(${x * d}px, ${y * d}px)`;
    });
  });
  hero.addEventListener('mouseleave', () => cards.forEach(c => c.style.transform = ''));
})();

// Magnetic primary buttons
(function initMagnetic() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const targets = '.hero__ctas .btn--primary, .nav .btn--primary, .guarantee .btn--primary, .final-cta .btn--primary';
  document.querySelectorAll(targets).forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.28;
      const y = (e.clientY - r.top  - r.height / 2) * 0.42;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform .45s cubic-bezier(.25,.8,.25,1)';
      btn.style.transform  = '';
      setTimeout(() => btn.style.transition = '', 450);
    });
  });
})();

// Testimonials — CSS-animation infinite carousel
(function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel__track');
  if (!track) return;

  // Clone all cards for seamless loop (CSS animation covers -50%)
  const origCards = [...track.querySelectorAll('.story-card')];
  origCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  // Pause on hover (CSS also handles :hover, this adds touch support)
  carousel.addEventListener('mouseenter', () => carousel.classList.add('is-paused'));
  carousel.addEventListener('mouseleave', () => carousel.classList.remove('is-paused'));

  // Touch — pause while touching
  carousel.addEventListener('touchstart', () => carousel.classList.add('is-paused'), { passive: true });
  carousel.addEventListener('touchend',   () => carousel.classList.remove('is-paused'), { passive: true });
})();

// Nav active link highlight on scroll
(function initNavActive() {
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.nav__links a[href^="#"]')];
  if (!sections.length || !navLinks.length) return;

  function update() {
    const mid = window.innerHeight * 0.35;
    let current = sections[0].id;
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= mid) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// Scroll-reveal animations
(function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(() => el.classList.add('is-visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

  elements.forEach(el => observer.observe(el));
})();

// Process timeline: animate the fill line when section enters view
(function initTimelineFill() {
  const section = document.querySelector('.process');
  if (!section) return;
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      section.classList.add('tl-revealed');
      observer.disconnect();
    }
  }, { threshold: 0.12 });
  observer.observe(section);
})();

// Video spotlight modal
(function initVideoModal() {
  const trigger  = document.getElementById('video-trigger');
  const modal    = document.getElementById('modal-video');
  const backdrop = document.getElementById('video-backdrop');
  const closeBtn = document.getElementById('video-close');
  const iframe   = document.getElementById('video-iframe');
  if (!trigger || !modal || !iframe) return;

  // Replace VIDEO_ID with your actual YouTube video ID
  const VIDEO_SRC = iframe.dataset.src || 'https://www.youtube.com/embed/?autoplay=1&rel=0';

  function openVideo() {
    iframe.src = VIDEO_SRC;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-lock');
    setTimeout(() => closeBtn && closeBtn.focus(), 100);
  }

  function closeVideo() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-lock');
    // Stop video by clearing src
    setTimeout(() => { iframe.src = ''; }, 300);
    trigger.focus();
  }

  trigger.addEventListener('click', openVideo);
  trigger.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideo(); }});
  backdrop.addEventListener('click', closeVideo);
  closeBtn.addEventListener('click', closeVideo);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeVideo(); });
})();

// Smooth-scroll offset for sticky nav
(function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const nav = document.querySelector('.nav');
      const offset = nav ? nav.offsetHeight + 12 : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// Sticky footer CTA — show after scrolling past hero
function initStickyCta() {
  const bar = document.getElementById('sticky-cta');
  const dismiss = document.getElementById('sticky-cta-dismiss');
  if (!bar) return;

  let dismissed = false;
  try {
    dismissed = sessionStorage.getItem('ttStickyDismissed') === '1';
  } catch (_) {}
  if (dismissed) return;

  const threshold = 500;
  let ticking = false;
  function update() {
    ticking = false;
    if (window.scrollY > threshold) {
      bar.classList.add('is-visible');
      bar.setAttribute('aria-hidden', 'false');
    } else {
      bar.classList.remove('is-visible');
      bar.setAttribute('aria-hidden', 'true');
    }
  }
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  if (dismiss) {
    dismiss.addEventListener('click', () => {
      bar.classList.remove('is-visible');
      bar.classList.add('is-dismissed');
      bar.setAttribute('aria-hidden', 'true');
      try { sessionStorage.setItem('ttStickyDismissed', '1'); } catch (_) {}
      window.removeEventListener('scroll', onScroll);
    });
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStickyCta);
} else {
  initStickyCta();
}

// Hero canvas — animated cyber particle network
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildParticles();
  }

  function buildParticles() {
    const count = Math.max(40, Math.floor((W * H) / 11000));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r:  Math.random() * 1.6 + 0.6
      });
    }
  }

  const MAX_DIST   = 130;
  const MOUSE_DIST = 170;
  const MAX_SPEED  = 2.2;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      if (p.x > W) { p.x = W; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      if (p.y > H) { p.y = H; p.vy *= -1; }

      const mdx = p.x - mouse.x;
      const mdy = p.y - mouse.y;
      const md  = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < MOUSE_DIST && md > 0) {
        const f = (1 - md / MOUSE_DIST) * 0.6;
        p.vx += (mdx / md) * f;
        p.vy += (mdy / md) * f;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > MAX_SPEED) { p.vx *= MAX_SPEED / spd; p.vy *= MAX_SPEED / spd; }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(127,203,174,0.8)';
      ctx.shadowBlur  = 5;
      ctx.shadowColor = 'rgba(127,203,174,0.5)';
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(127,203,174,${alpha})`;
          ctx.lineWidth   = 0.75;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  const hero = canvas.closest('.hero');
  if (hero) {
    hero.addEventListener('mousemove', e => {
      const r  = hero.getBoundingClientRect();
      mouse.x  = e.clientX - r.left;
      mouse.y  = e.clientY - r.top;
    });
    hero.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  draw();
})();

// Countdown timer — urgency section
(function initCountdown() {
  // Cohort start comes from data-cohort-date on #urgency-countdown (ISO, e.g. 2026-12-01T09:00:00).
  // Left empty until dates are announced, in which case the countdowns stay hidden and nothing ticks.
  const cdEl = document.getElementById('urgency-countdown');
  const TARGET = new Date((cdEl && cdEl.dataset.cohortDate) || '');
  if (isNaN(TARGET)) return;
  const pad = n => String(n).padStart(2, '0');

  // IDs for main urgency section + sticky footer bar
  const FIELDS = [
    ['cd-days',  'scd-days'],
    ['cd-hours', 'scd-hours'],
    ['cd-mins',  'scd-mins'],
    ['cd-secs',  'scd-secs'],
  ];

  function tick() {
    const diff = TARGET - Date.now();
    const vals = diff <= 0 ? [0, 0, 0, 0] : [
      Math.floor(diff / 86400000),
      Math.floor((diff % 86400000) / 3600000),
      Math.floor((diff % 3600000)  / 60000),
      Math.floor((diff % 60000)    / 1000),
    ];
    FIELDS.forEach(([mainId, stickyId], i) => {
      const txt = pad(vals[i]);
      const main = document.getElementById(mainId);
      const sticky = document.getElementById(stickyId);
      if (main) main.textContent = txt;
      if (sticky) sticky.textContent = txt;
    });
  }
  tick();
  setInterval(tick, 1000);
})();

// Seats progress bar — animate when scrolled into view
(function initSeatsBar() {
  const fill = document.querySelector('.seats__fill');
  if (!fill) return;
  const bar = fill.closest('.seats__bar');
  const pct = bar ? getComputedStyle(bar).getPropertyValue('--fill').trim() : '72%';
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      fill.style.width = pct;
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(fill);
})();
