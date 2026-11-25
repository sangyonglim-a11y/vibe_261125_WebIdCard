(() => {
  const card = document.getElementById("card");
  const avatar = document.getElementById("avatar");
  const copyBtn = document.getElementById("copyBtn");
  const toast = document.getElementById("toast");
  const leftPupil = document.querySelector(".left-pupil");
  const rightPupil = document.querySelector(".right-pupil");
  const mouth = document.querySelector(".mouth");

  const smileOpen = "M104 152c10 12 26 12 36 0";
  const smileWide = "M100 150c12 16 32 16 44 0";
  const placeUrl = "https://naver.me/xTbjR4Uz";

  requestAnimationFrame(() => {
    card.classList.add("is-in");
  });

  function movePupils(clientX, clientY) {
    const rect = avatar.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = Math.max(-1, Math.min(1, (clientX - cx) / (rect.width * 0.7)));
    const dy = Math.max(-1, Math.min(1, (clientY - cy) / (rect.height * 0.7)));
    const ox = dx * 3.2;
    const oy = dy * 2.4;

    leftPupil.setAttribute("cx", String(98 + ox));
    leftPupil.setAttribute("cy", String(119 + oy));
    rightPupil.setAttribute("cx", String(146 + ox));
    rightPupil.setAttribute("cy", String(119 + oy));
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      movePupils(event.clientX, event.clientY);
    },
    { passive: true }
  );

  avatar.addEventListener("pointerenter", () => {
    mouth.setAttribute("d", smileWide);
  });

  avatar.addEventListener("pointerleave", () => {
    mouth.setAttribute("d", smileOpen);
  });

  let toastTimer = 0;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-show");
    }, 1800);
  }

  async function copyContacts() {
    const text = [
      "임상용 · 중계고기파티 대표",
      "이베리코 흑돼지 전문점",
      "sylims@hanmail.net",
      "010-2774-3024",
      placeUrl,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      showToast("연락처를 복사했어요");
    } catch {
      showToast("복사에 실패했어요");
    }
  }

  copyBtn.addEventListener("click", copyContacts);
})();
