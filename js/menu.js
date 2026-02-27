// =========================
// MENU MOBILE — HAMBÚRGUER
// =========================

const hamburger = document.getElementById("hamburgerBtn");
const navList = document.querySelector(".nav-list");
const hasSubmenu = document.querySelector(".has-submenu");
const submenuToggle = document.querySelector(".submenu-toggle");

// abrir / fechar menu principal
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navList.classList.toggle("active");
});

// toggle do submenu (Cookies)
submenuToggle.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    e.preventDefault(); // só impede o Cookies
    hasSubmenu.classList.toggle("open");
  }
});

// clique nos links do submenu → navegação normal
document.querySelectorAll(".submenu a").forEach(link => {
  link.addEventListener("click", () => {
    navList.classList.remove("active");
    hamburger.classList.remove("active");
    hasSubmenu.classList.remove("open");
  });
});

// links normais do menu
document.querySelectorAll(".nav-list > li > a:not(.submenu-toggle)")
  .forEach(link => {
    link.addEventListener("click", () => {
      navList.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
