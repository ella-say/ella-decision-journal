document.addEventListener("DOMContentLoaded", () => {
  const thoughtBox = document.querySelector("#thoughtBox");
  const saveState = document.querySelector("#saveState");
  const saveThought = document.querySelector("#saveThought");
  const copyQuestions = document.querySelector("#copyQuestions");
  const toast = document.querySelector("#toast");
  const prefillButtons = document.querySelectorAll("[data-prefill]");

  const showToast = (text) => {
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1600);
  };

  const saved = localStorage.getItem("ella-current-thought");
  if (saved && thoughtBox) {
    thoughtBox.value = saved;
    saveState.textContent = "上次寫的還在";
  }

  if (saveThought) {
    saveThought.addEventListener("click", () => {
      const value = thoughtBox.value.trim();
      if (!value) {
        showToast("先寫一句就好");
        thoughtBox.focus();
        return;
      }
      localStorage.setItem("ella-current-thought", value);
      saveState.textContent = "已經幫你放著了";
      showToast("存好了");
    });
  }

  prefillButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      thoughtBox.value = btn.dataset.prefill || "";
      document.querySelector("#write").scrollIntoView({behavior:"smooth"});
      setTimeout(() => {
        thoughtBox.focus();
        thoughtBox.setSelectionRange(thoughtBox.value.length, thoughtBox.value.length);
      }, 450);
    });
  });

  if (copyQuestions) {
    copyQuestions.addEventListener("click", async () => {
      const text = `Ella 卡點五問

1. 現在到底發生什麼？
2. 我真正難受的是什麼？
3. 我真正卡住的是哪一件事？
4. 有哪些選擇，各要付什麼代價？
5. 我現在可以先做哪一小步？`;
      try {
        await navigator.clipboard.writeText(text);
        showToast("五題已複製");
      } catch {
        showToast("請長按文字手動複製");
      }
    });
  }
});
