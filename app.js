document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      setTimeout(() => {
        target.setAttribute("tabindex", "-1");
        target.focus({preventScroll:true});
      }, 450);
    });
  });
});
