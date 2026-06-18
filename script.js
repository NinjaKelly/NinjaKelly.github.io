window.addEventListener("load", () => {
  window.setTimeout(() => {
    document.getElementById("loader")?.classList.add("hidden");
  }, 520);
});

const typeTarget = document.getElementById("typewriterTarget");
if (typeTarget) {
  const text = "把可信智能体做成可运行、可审计、可复现的系统";
  let index = 0;
  const tick = () => {
    typeTarget.textContent = text.slice(0, index);
    index += 1;
    if (index <= text.length) {
      window.setTimeout(tick, 70 + Math.random() * 45);
    }
  };
  window.setTimeout(tick, 560);
}

const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursorDot");
if (cursor && cursorDot && window.matchMedia("(min-width: 769px)").matches) {
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  const animateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  const interactiveSelector = "a, button, .polaroid, .tag, .skill-sticky, .project-shot";
  document.addEventListener("mouseover", (event) => {
    if (event.target.closest(interactiveSelector)) cursor.classList.add("hover");
  });
  document.addEventListener("mouseout", (event) => {
    if (event.target.closest(interactiveSelector)) cursor.classList.remove("hover");
  });
}

document.querySelectorAll(".reveal").forEach((element) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );
  observer.observe(element);
});

const polaroid = document.getElementById("polaroid");
polaroid?.addEventListener("click", () => {
  polaroid.classList.toggle("flipped");
});

document.querySelectorAll(".tl-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("expanded");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll(".project-shot").forEach((shot) => {
  shot.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.className = "shot-overlay";
    overlay.innerHTML = `<img src="${shot.src}" alt="${shot.alt}">`;
    overlay.addEventListener("click", () => overlay.remove());
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "99998",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "rgba(72, 63, 68, 0.76)",
      cursor: "zoom-out"
    });
    Object.assign(overlay.querySelector("img").style, {
      maxWidth: "min(100%, 980px)",
      maxHeight: "90vh",
      border: "12px solid #fff",
      boxShadow: "0 18px 80px rgba(0,0,0,0.25)"
    });
    document.body.appendChild(overlay);
  });
});
