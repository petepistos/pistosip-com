/* Keep in-page links and keyboard focus clear of the navigation at every width. */
(() => {
  const header = document.querySelector(".head, .mn-head");
  if (!header) return;

  const root = document.documentElement;
  const measure = () => {
    const height = Math.ceil(header.getBoundingClientRect().height);
    root.style.setProperty("--head-height", `${height}px`);
  };

  measure();
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(measure);
    observer.observe(header);
  } else {
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("load", measure, { once: true });
  }
})();
