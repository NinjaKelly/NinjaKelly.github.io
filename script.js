const revealEls = document.querySelectorAll("[data-reveal]");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el) => revealObserver.observe(el));

const setActiveNav = () => {
  let current = null;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top < 140) {
      current = section;
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });
};

window.addEventListener("scroll", setActiveNav, { passive: true });
window.addEventListener("load", setActiveNav);
