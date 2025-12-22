// 取得卡片元素
const cardEl = document.getElementById("card");
const textEl = document.getElementById("cardText");

// cards 先給空陣列，避免 not defined
let cards = [];

// 先顯示提示
textEl.textContent = "點一下抽一張";

// 載入 cards.json
async function loadCards() {
  try {
    const res = await fetch("./cards.json", { cache: "no-store" });
    if (!res.ok) throw new Error("cards.json 載入失敗：" + res.status);
    cards = await res.json();
    console.log("cards loaded:", cards.length);
  } catch (err) {
    console.error(err);
    textEl.textContent = "卡牌載入失敗（請看 Console）";
  }
}

// 抽卡
function drawOne() {
  if (!cards || cards.length === 0) return;

  const randomIndex = Math.floor(Math.random() * cards.length);
  const card = cards[randomIndex];

  // 兼容 cards.json 欄位：text
  const newText = card.text || "（這張卡沒有文字）";

  // 文字淡入：先移除，再加回
  textEl.classList.remove("is-show");
  textEl.textContent = newText;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      textEl.classList.add("is-show");
    });
  });
}

// 點擊事件
cardEl.addEventListener("click", drawOne);

// 開頁先載入
loadCards();
