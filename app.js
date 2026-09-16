document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  document.documentElement.style.setProperty("--current-year", `"${year}"`);
});
