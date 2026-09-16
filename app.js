document.addEventListener("DOMContentLoaded", () => {
  const problemButtons = [...document.querySelectorAll(".problem-card")];
  const selectedProblem = document.querySelector("#selectedProblem");
  const textareas = [...document.querySelectorAll("textarea[data-q]")];
  const progressText = document.querySelector("#progressText");
  const progressBar = document.querySelector("#progressBar");
  const nextStepPreview = document.querySelector("#nextStepPreview");
  const clearForm = document.querySelector("#clearForm");
  const copySummary = document.querySelector("#copySummary");
  const toast = document.querySelector("#toast");

  const updateProgress = () => {
    const filled = textareas.filter(t => t.value.trim()).length;
    progressText.textContent = `${filled} / 5`;
    progressBar.style.width = `${filled / 5 * 100}%`;
    const last = textareas.find(t => t.dataset.q === "5");
    nextStepPreview.textContent = last.value.trim()
      ? last.value.trim()
      : "當你填完第 5 題，這裡會留下你的下一步。";
    textareas.forEach(t => localStorage.setItem(`ella-q-${t.dataset.q}`, t.value));
  };

  problemButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const problem = btn.dataset.problem;
      selectedProblem.textContent = problem;
      localStorage.setItem("ella-problem", problem);
      document.querySelector("#start").scrollIntoView({behavior:"smooth"});
      setTimeout(() => textareas[0].focus(), 500);
    });
  });

  const savedProblem = localStorage.getItem("ella-problem");
  if (savedProblem) selectedProblem.textContent = savedProblem;

  textareas.forEach(t => {
    const saved = localStorage.getItem(`ella-q-${t.dataset.q}`);
    if (saved) t.value = saved;
    t.addEventListener("input", updateProgress);
  });
  updateProgress();

  clearForm.addEventListener("click", () => {
    if (!confirm("確定要清空目前整理的內容嗎？")) return;
    textareas.forEach(t => {
      t.value = "";
      localStorage.removeItem(`ella-q-${t.dataset.q}`);
    });
    localStorage.removeItem("ella-problem");
    selectedProblem.textContent = "還沒選，直接寫也可以";
    updateProgress();
  });

  copySummary.addEventListener("click", async () => {
    const problem = selectedProblem.textContent;
    const labels = [
      "現在到底發生什麼？",
      "我真正難受的是什麼？",
      "我真正卡住的是哪一件事？",
      "有哪些選擇，各要付什麼代價？",
      "我現在可以先做哪一小步？"
    ];
    const content = [
      `【Ella Decision Journal｜我的整理】`,
      `主題：${problem}`,
      "",
      ...textareas.flatMap((t, i) => [
        `${i+1}. ${labels[i]}`,
        t.value.trim() || "（尚未填寫）",
        ""
      ])
    ].join("\n");

    try {
      await navigator.clipboard.writeText(content);
      toast.textContent = "已複製你的整理";
    } catch {
      toast.textContent = "無法自動複製，請手動選取";
    }
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  });

  const filters = [...document.querySelectorAll(".filter")];
  const cards = [...document.querySelectorAll(".article-card")];
  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      cards.forEach(card => {
        const cats = (card.dataset.category || "").split(" ");
        card.hidden = f !== "all" && !cats.includes(f);
      });
    });
  });
});
