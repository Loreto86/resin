/* =============================================================
   RESINA — landing interactions
   - scroll reveal (IntersectionObserver)
   - graceful fallback for placeholder images that aren't uploaded yet
   - footer year
   ============================================================= */
(function () {
  "use strict";

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- placeholder image fallback ----------
     Every real <img> points at assets/images/*.webp. Until those files
     are supplied, this swaps a broken image for a soft styled
     placeholder that still communicates what belongs there — so the
     page always looks intentional, never broken. Once a real photo is
     dropped into assets/images/ with the matching filename, the <img>
     loads normally and this never runs for that element. */
  function installImageFallback() {
    var imgs = document.querySelectorAll("img[data-fallback-label]");
    imgs.forEach(function (img) {
      img.addEventListener(
        "error",
        function () {
          if (img.dataset.fallbackApplied) return;
          img.dataset.fallbackApplied = "true";
          var wrap = document.createElement("div");
          wrap.className = "img-fallback";
          var label = document.createElement("span");
          label.textContent = img.dataset.fallbackLabel || "Imagen pendiente";
          wrap.appendChild(label);
          img.replaceWith(wrap);
        },
        { once: true }
      );
    });
  }
  installImageFallback();

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- header contrast on dark sections (mix-blend already
     handles most of this via CSS; kept minimal on purpose) ---------- */
})();
