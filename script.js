// ===== CUSTOM CURSOR =====
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener("mousemove", e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});

(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll("a, button, .stat-item, .work-item, .tool-tag, .edu-item").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
    ring.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
    ring.classList.remove("hover");
  });
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate skill bars
      entry.target.querySelectorAll(".skill-fill").forEach(bar => {
        bar.classList.add("animate");
      });

      // Animate counters
      entry.target.querySelectorAll("[data-count]").forEach(el => {
        const target = +el.getAttribute("data-count");
        const start = performance.now();
        const duration = 1400;

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = target;
        }
        requestAnimationFrame(update);
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal, .stat-item").forEach(el => observer.observe(el));

// ===== MOBILE NAV =====
function openMobileNav() {
  document.getElementById("mobileNav").classList.add("open");
}

function closeMobileNav() {
  document.getElementById("mobileNav").classList.remove("open");
}

document.getElementById("navClose").addEventListener("click", closeMobileNav);

// ===== NAV SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const nav = document.getElementById("mainNav");
  nav.style.background = window.scrollY > 50
    ? "rgba(8,8,8,.97)"
    : "";
});

// ===== DISABLE CURSOR ON TOUCH DEVICES =====
if ("ontouchstart" in window) {
  cursor.style.display = "none";
  ring.style.display = "none";
  document.body.style.cursor = "auto";
}
