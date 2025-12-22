// 取得卡片元素
const cardEl = document.getElementById("card");
const textEl = document.getElementById("cardText");

console.log("cardEl:", cardEl, "textEl:", textEl);

let cards = [];

async function loadCards() {
  try {
    const res = await fetch("./cards.json", { cache: "no-store" });
    console.log("cards.json status:", res.status);

    if (!res.ok) throw new Error("cards.json 載入失敗: " + res.status);

    cards = await res.json();
    console.log("cards loaded:", cards);

    // 載入成功後給提示
    textEl.textContent = "點一下抽一張";
  } catch (err) {
    console.error(err);
    textEl.textContent = "cards.json 讀不到（看 Console）";
  }
}

// 點擊抽卡
cardEl.addEventListener("click", () => {
  console.log("clicked, cards length:", cards?.length);

  if (!cards || cards.length === 0) return;

  const randomIndex = Math.floor(Math.random() * cards.length);
  const card = cards[randomIndex];
  const newText = card.text ?? "（這張卡沒有文字）";

  // 小動畫：先消失再出現
  textEl.classList.remove("is-show");
  textEl.textContent = newText;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      textEl.classList.add("is-show");
    });
  });
});

// 開頁就載入
loadCards();
