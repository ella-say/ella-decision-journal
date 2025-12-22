const cardEl = document.getElementById("card");

let cards = [];

fetch("cards.json")
  .then(res => res.json())
  .then(data => {
    cards = data;
  });

cardEl.addEventListener("click", () => {
  if (cards.length === 0) return;

  const randomIndex = Math.floor(Math.random() * cards.length);
  const card = cards[randomIndex];

  cardEl.className = "card-front";
  cardEl.textContent = card.text;
});
