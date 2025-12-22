const cards = [
  "assets/cards/001.png",
  "assets/cards/002.png",
  "assets/cards/003.png"
];

document.getElementById("draw").addEventListener("click", () => {
  const card = cards[Math.floor(Math.random() * cards.length)];
  document.getElementById("card").src = card;
});
