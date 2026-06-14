// This module controls the responsive hamburger navigation for small screens.
const menuButton = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

if (menuButton && navMenu) {
  menuButton.setAttribute("aria-expanded", "false");

  menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen.toString());
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}
