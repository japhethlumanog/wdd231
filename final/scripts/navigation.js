// navigation.js — Responsive hamburger menu for all pages.
const menuButton = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

if (menuButton && navMenu) {
  menuButton.setAttribute("aria-expanded", "false");

  menuButton.addEventListener("click", () => {
    const isOpen = navMenu.querySelector("ul").classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen.toString());
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.querySelector("ul").classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}
