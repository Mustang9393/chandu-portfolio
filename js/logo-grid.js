(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cells = Array.from(document.querySelectorAll(".logo-cell"));

  if (!prefersReducedMotion && cells.length) {
    let pointer = { x: -9999, y: -9999 };
    let frame = null;

    const update = () => {
      frame = null;

      cells.forEach((cell, index) => {
        const rect = cell.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = pointer.x - cx;
        const dy = pointer.y - cy;
        const distance = Math.hypot(dx, dy);
        const radius = Math.max(rect.width * 2.4, 170);
        const pull = Math.max(0, 1 - distance / radius);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const rotation = angle * 0.18 * pull;
        const scale = 1 + pull * 0.11;

        cell.style.setProperty("--logo-rotate", `${rotation.toFixed(2)}deg`);
        cell.style.setProperty("--logo-scale", scale.toFixed(3));
        cell.classList.toggle("is-near", pull > 0.28);
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      requestUpdate();
    }, { passive: true });

    window.addEventListener("pointerleave", () => {
      pointer = { x: -9999, y: -9999 };
      requestUpdate();
    });
  }

  const revealItems = document.querySelectorAll("[data-reveal]");

  if (revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => observer.observe(item));
  }
})();
