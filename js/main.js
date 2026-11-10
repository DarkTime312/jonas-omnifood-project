// ===========================
//        Mobile Menu
// =========================
const hamburgerBtn = document.querySelector('[aria-controls="primary-nav"]');
const hamburgerLinks = document.querySelectorAll(".primary-nav a");

const isMenuOpen = () => hamburgerBtn.getAttribute("aria-expanded") === "true";

function toggleHamburgerMenu() {
  // If it's open, we want to close it (false). If closed, we want to open it (true).
  const willOpen = !isMenuOpen();

  // Update Accessibility attributes
  hamburgerBtn.setAttribute("aria-expanded", willOpen);
}

hamburgerBtn.addEventListener("click", toggleHamburgerMenu);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMenuOpen()) {
    toggleHamburgerMenu();
    hamburgerBtn.focus(); // Return focus to button for keyboard users
  }
});

// Close the menu on link click
hamburgerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (isMenuOpen()) toggleHamburgerMenu();
  });
});

// Temporarily disable all CSS animations and transitions
// whenever the browser window is being resized
const resizeObserver = new ResizeObserver((entries) => {
  document.body.classList.add("u-resize-animation-stopper");

  requestAnimationFrame(() => {
    document.body.classList.remove("u-resize-animation-stopper");
  });
});

resizeObserver.observe(document.body);

// ===========================
//        Page header
// =========================

const pageHeader = document.querySelector(".page-header");
const hero = document.querySelector(".hero");

const observer = new IntersectionObserver(
  ([entry]) => {
    pageHeader.toggleAttribute("data-stuck", !entry.isIntersecting);
  },
  {
    root: null, // viewport
    threshold: 0, // trigger as soon as 0% of hero is visible
    rootMargin: "-80px", // triggers 80px BEFORE the hero completely leaves!
  },
);

observer.observe(hero);

// ===========================
//        Page footer
// =========================

function updateCopyrightYear() {
  const copyrightYear = document.querySelector(".page-footer__copyright-year");
  copyrightYear.textContent = new Date().getFullYear();
}

updateCopyrightYear();
