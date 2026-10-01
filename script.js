const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navigationLinks = document.querySelector(".navigation-links");
const feedbackDialog = document.querySelector(".feedback-dialog");
const feedbackForm = document.querySelector(".feedback-form");

function updateHeader() {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (menuToggle && navigationLinks) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navigationLinks.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navigationLinks.classList.toggle("is-open", !isOpen);
  });

  navigationLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });
}

if (feedbackDialog && feedbackForm) {
  let feedbackTrigger = null;

  feedbackDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      feedbackDialog.close();
    }
  });

  feedbackDialog.addEventListener("close", () => feedbackTrigger?.focus());

  document.querySelectorAll(".feedback-open").forEach((button) => {
    button.addEventListener("click", () => {
      feedbackTrigger = button;
      feedbackDialog.showModal();
    });
  });

  document.querySelectorAll(".feedback-close, .feedback-cancel").forEach((button) => {
    button.addEventListener("click", () => feedbackDialog.close());
  });

  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = new FormData(feedbackForm).get("message")?.toString().trim();
    if (!message) return;

    const subject = encodeURIComponent("Portfolio feedback");
    const body = encodeURIComponent(message);
    window.location.href = `mailto:camila@b3services.com?subject=${subject}&body=${body}`;
    feedbackDialog.close();
    feedbackForm.reset();
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}