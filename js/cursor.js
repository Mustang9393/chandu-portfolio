/* ============================================
   CURSOR.JS — Custom Cursor
   Chandu MP Portfolio
   ============================================ */

class CustomCursor {
  constructor() {
    this.dot = document.querySelector('.cursor-dot');
    this.ring = document.querySelector('.cursor-ring');

    this.mouse = { x: 0, y: 0 };
    this.ringPos = { x: 0, y: 0 };
    this.ringSpeed = 0.12;

    this.init();
  }

  init() {
    if (!this.dot || !this.ring) return;

    // Track raw mouse for the dot (instant)
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      // Dot follows instantly
      this.dot.style.left = e.clientX + 'px';
      this.dot.style.top = e.clientY + 'px';
    });

    // Ring follows with lag via RAF
    this.animateRing();

    // Hover states
    this.bindHoverStates();

    // Hide when leaving window
    document.addEventListener('mouseleave', () => {
      this.dot.style.opacity = '0';
      this.ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      this.dot.style.opacity = '1';
      this.ring.style.opacity = '1';
    });
  }

  animateRing() {
    // Lerp ring towards mouse
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * this.ringSpeed;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * this.ringSpeed;

    this.ring.style.left = this.ringPos.x + 'px';
    this.ring.style.top = this.ringPos.y + 'px';

    requestAnimationFrame(() => this.animateRing());
  }

  bindHoverStates() {
    // Hover on links and buttons
    const hoverTargets = document.querySelectorAll(
      'a, button, .project-featured, .project-card, .capability, .stat-row'
    );

    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });

    // Text cursor on paragraphs
    const textTargets = document.querySelectorAll('p, h1, h2, h3, h4');

    textTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-text');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-text');
      });
    });
  }
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new CustomCursor();
});
