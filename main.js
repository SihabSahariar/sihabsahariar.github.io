// Portfolio interactions: nav state, scroll reveals, project filters, a flickering HUD FPS counter.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 12);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.getElementById("yr").textContent = new Date().getFullYear();

  // Reveal on scroll.
  const targets = document.querySelectorAll(".stats, .feature, .card, .timeline > li, .team, .m, .pubs li, .posts li, .tools > div, .contact-inner");
  if ("IntersectionObserver" in window && !reduce) {
    targets.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    targets.forEach((el) => io.observe(el));
  }

  // Project filters.
  const buttons = document.querySelectorAll(".filters button");
  const cards = document.querySelectorAll(".card");
  buttons.forEach((b) => b.addEventListener("click", () => {
    buttons.forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    const f = b.dataset.f;
    cards.forEach((c) => {
      const show = f === "all" || c.dataset.cat.split(" ").includes(f);
      c.classList.toggle("hidden", !show);
      if (show) c.classList.add("in");
    });
  }));

  // HUD: a believable, slightly jittery frame rate.
  const fps = document.getElementById("fps");
  if (fps && !reduce) setInterval(() => { fps.textContent = 28 + Math.round(Math.random() * 4); }, 900);
})();
