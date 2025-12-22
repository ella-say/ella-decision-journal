const textEl = document.querySelector(".card-text");
const cardEl = document.querySelector(".card-back"); // 你原本如果不是 .card-back，就不要改這行

cardEl.addEventListener("click", () => {
  if (!cards || cards.length === 0) return;

  const randomIndex = Math.floor(Math.random() * cards.length);
  const card = cards[randomIndex];

  // ✅ 先讓文字消失
  textEl.classList.remove("is-show");

  // ✅ 換文字
  textEl.textContent = card.text;

  // ✅ 再淡入（穩定觸發）
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      textEl.classList.add("is-show");
    });
  });
});
