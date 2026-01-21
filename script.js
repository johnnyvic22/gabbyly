const mainHead = document.querySelector(".main-head");
const topbar = document.querySelector(".topbar");

if (mainHead && topbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      mainHead.classList.add("slidedown");
      topbar.classList.add("hidden");
    } else {
      mainHead.classList.remove("slidedown");
      topbar.classList.remove("hidden");
    }
  });
}

const main_4 = document.querySelector(".main-4");
const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll(".carousel img");
const buttons = document.querySelectorAll(".button");

let imageIndex = 0;
let intervalId;

if (main_4 && carousel && images.length) {
  const slideImage = () => {
    imageIndex =
      imageIndex === images.length ? 0 :
      imageIndex < 0 ? images.length - 1 :
      imageIndex;

    carousel.style.transform = `translateX(-${imageIndex * 100}%)`;
  };

  const autoSlide = () => {
    intervalId = setInterval(() => {
      imageIndex++;
      slideImage();
    }, 4000);
  };

  const updateClick = (e) => {
    clearInterval(intervalId);

    const btn = e.target.closest(".button");
    if (!btn) return;

    imageIndex += btn.id === "next" ? 1 : -1;
    slideImage();
    autoSlide();
  };

  buttons.forEach((btn) => btn.addEventListener("click", updateClick));

  main_4.addEventListener("mouseover", () => clearInterval(intervalId));
  main_4.addEventListener("mouseleave", autoSlide);

  autoSlide();
}

const btn = document.querySelector(".hamburger");
const drawer = document.getElementById("mobileDrawer");
const back = document.getElementById("drawerBackdrop");
const closeBtn = document.querySelector(".drawer-close");

if (btn && drawer && back) {
  function setOpen(open) {
    drawer.classList.toggle("open", open);
    back.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", String(open));
  }

  btn.addEventListener("click", () => {
    setOpen(!drawer.classList.contains("open"));
  });

  back.addEventListener("click", () => setOpen(false));

  drawer.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === "A") setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  closeBtn?.addEventListener("click", () => setOpen(false));
}