const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  
  function toggleMenu() {
    const isNowOpen = navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isNowOpen);
  }
  
  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  
  hamburger.addEventListener('click', () => {
    toggleMenu();
  });

  const navLinks = navMenu.querySelectorAll('a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });


  document.addEventListener('click', (event) => {
    const clickedHamburger = hamburger.contains(event.target);
    const clickedMenu = navMenu.contains(event.target);
    
    if (!clickedHamburger && !clickedMenu) {
      closeMenu();
    }
  });
}