// Click-to-play YouTube embeds (privacy-enhanced, nothing loads until you press play) and category filters.
(() => {
  document.querySelectorAll(".yt").forEach((box) => {
    const play = () => {
      if (box.classList.contains("playing")) return;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${box.dataset.id}?autoplay=1&rel=0&modestbranding=1`;
      iframe.title = box.dataset.title || "YouTube video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      box.classList.add("playing");
      box.replaceChildren(iframe);
    };
    box.addEventListener("click", play);
    box.querySelector("button")?.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } });
  });

  const buttons = document.querySelectorAll("#all .filters button");
  const cards = document.querySelectorAll(".vcard");
  buttons.forEach((b) => b.addEventListener("click", () => {
    buttons.forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    cards.forEach((c) => {
      const show = b.dataset.f === "all" || c.dataset.cat.split(" ").includes(b.dataset.f);
      c.classList.toggle("hidden", !show);
      if (show) c.classList.add("in");
    });
  }));
})();
