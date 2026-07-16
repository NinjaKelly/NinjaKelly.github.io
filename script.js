document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox?.querySelector("img");
const closeButton = lightbox?.querySelector(".lightbox-close");

const openLightbox = (src, alt) => {
  if (!lightbox || !lightboxImage || !closeButton) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt || "Image preview";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  closeButton.focus();
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
};

document.querySelectorAll(".image-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openLightbox(trigger.dataset.image, trigger.dataset.alt);
  });
});

closeButton?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});
