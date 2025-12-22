// 取得卡片元素
const cardEl = document.getElementById("card");
const textEl = document.getElementById("cardText");
console.log("cardEl:", cardEl, "textEl:", textEl);

// 先給使用者提示
textEl.textContent = "點一下";

// cards 先宣告成空陣列（避免 not defined）
let cards = [];

// 載入 cards.json
async function loadCards() {
  try {
    const res = await fetch("./cards.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`cards.json 載入失敗：${res.status}`);
    cards = await res.json();
console.log("cards loaded:", cards);

    // 基本檢查
    if (!Array.isArray(cards) || cards.length === 0) {
      throw new Error("cards.json 不是陣列或內容是空的");
    }

    // 載入成功後提示
    textEl.textContent = "點一下抽一張";
  } catch (err) {
    console.error(err);
    textEl.textContent = "載入失敗（看主控台）";
  }
}

// 點擊抽卡
cardEl.addEventListener("click", () => {console.log("clicked, cards length:", cards?.length);

  if (!cards || cards.length === 0) return;

  const randomIndex = Math.floor(Math.random() * cards.length);
  const card = cards[randomIndex];

  // 兼容你的 cards.json 欄位：text
  const newText = card.text ?? "（這張卡沒有文字）";

  // 簡單的小動畫：先移除再加回 class
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
