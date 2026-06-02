(() => {
  const triggers = Array.from(document.querySelectorAll("[data-offline-modal]"));

  if (!triggers.length) return;

  const modal = document.createElement("div");
  modal.className = "offline-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="offline-modal__backdrop" data-offline-close></div>
    <div class="offline-modal__panel" role="document">
      <button class="offline-modal__close" type="button" data-offline-close aria-label="Close">x</button>
      <p class="offline-modal__eyebrow">Project status</p>
      <h2 class="offline-modal__title"></h2>
      <p class="offline-modal__body"></p>
      <button class="offline-modal__button" type="button" data-offline-close>Got it</button>
    </div>
  `;
  document.body.appendChild(modal);

  const title = modal.querySelector(".offline-modal__title");
  const body = modal.querySelector(".offline-modal__body");
  const closeTargets = modal.querySelectorAll("[data-offline-close]");
  let lastTrigger = null;

  const open = (trigger) => {
    lastTrigger = trigger;
    title.textContent = trigger.dataset.offlineTitle || "This project is offline.";
    body.textContent = trigger.dataset.offlineReason || "The live product is no longer publicly available.";
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("offline-modal-open");
    modal.querySelector(".offline-modal__button").focus();
  };

  const close = () => {
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("offline-modal-open");
    if (lastTrigger) lastTrigger.focus();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      open(trigger);
    });
  });

  closeTargets.forEach((target) => target.addEventListener("click", close));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      close();
    }
  });
})();
