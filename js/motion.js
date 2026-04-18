/* ============================================
   MOTION.JS — Animations & Scroll Effects
   Chandu MP Portfolio
   ============================================ */

/* ─────────────────────────────────────────
   HERO INTRO SEQUENCE
───────────────────────────────────────── */

function runHeroIntro() {
  const chars = document.querySelectorAll('.hero-char');
  const eyebrow = document.querySelector('.hero-eyebrow');
  const heroBottom = document.querySelector('.hero-bottom');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (!chars.length) return;

  // Stagger each character in
  chars.forEach((char, i) => {
    setTimeout(() => {
      char.style.transition = `
        opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
        filter 0.7s cubic-bezier(0.16, 1, 0.3, 1)
      `;
      char.style.opacity = '1';
      char.style.transform = 'translateY(0) rotate(0deg)';
      char.style.filter = 'blur(0px)';
    }, 200 + i * 60);
  });

  // Eyebrow fades in after name
  setTimeout(() => {
    if (eyebrow) {
      eyebrow.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      eyebrow.style.opacity = '1';
      eyebrow.style.transform = 'translateY(0)';
    }
  }, 200 + chars.length * 60 + 100);

  // Bottom row slides up
  setTimeout(() => {
    if (heroBottom) {
      heroBottom.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
      heroBottom.style.opacity = '1';
      heroBottom.style.transform = 'translateY(0)';
    }
  }, 200 + chars.length * 60 + 300);

  // Scroll indicator appears last
  setTimeout(() => {
    if (scrollIndicator) {
      scrollIndicator.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1)';
      scrollIndicator.style.opacity = '1';
    }
  }, 200 + chars.length * 60 + 800);
}

/* ─────────────────────────────────────────
   NAV SCROLL STATE
───────────────────────────────────────── */

function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ─────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────── */

function initScrollReveal() {
  const reveals = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right'
  );

  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger children if parent has .stagger
          const parent = entry.target.closest('.stagger');
          if (parent) {
            const siblings = Array.from(parent.children);
            const index = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = index * 80 + 'ms';
          }
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ─────────────────────────────────────────
   PARALLAX
───────────────────────────────────────── */

function initParallax() {
  const elements = document.querySelectorAll('[data-parallax]');
  if (!elements.length) return;

  // Only run on non-touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const onScroll = () => {
    const scrollY = window.scrollY;

    elements.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2 + scrollY;
      const viewCenter = scrollY + window.innerHeight / 2;
      const offset = (scrollY - (elementCenter - viewCenter)) * speed;

      el.style.transform = `translateY(${offset}px)`;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ─────────────────────────────────────────
   MARQUEE PAUSE ON HOVER
───────────────────────────────────────── */

function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;

  track.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });

  track.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}

/* ─────────────────────────────────────────
   SECTION DIVIDER NUMBER COUNTER
───────────────────────────────────────── */

function initCounters() {
  const stats = document.querySelectorAll('.stat-number[data-count]');

  if (!stats.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = el.dataset.count;
          const isDecimal = target.includes('.');
          const suffix = target.replace(/[\d.]/g, '');
          const num = parseFloat(target);

          let start = 0;
          const duration = 1200;
          const startTime = performance.now();

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (num - start) * eased;

            el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              el.textContent = target;
            }
          };

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((el) => observer.observe(el));
}

/* ─────────────────────────────────────────
   INIT ALL
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  runHeroIntro();
  initNavScroll();
  initScrollReveal();
  initParallax();
  initMarquee();
  initCounters();
});
