// ========================================
// HAMBURGER MENU (Mobile Navigation)
// ========================================

// Get the hamburger button and menu elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Only run this code if we found both elements
if (hamburger && navMenu) {
  
  // ========================================
  // FUNCTION: Open or close the menu
  // ========================================
  function toggleMenu() {
    const isNowOpen = navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isNowOpen);
  }
  
  // ========================================
  // FUNCTION: Close the menu
  // ========================================
  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  
  // ========================================
  // WHEN: User clicks the hamburger button
  // THEN: Open or close the menu
  // ========================================
  hamburger.addEventListener('click', () => {
    toggleMenu();
  });

  // ========================================
  // WHEN: User clicks a link in the menu
  // THEN: Close the menu (nice for mobile)
  // ========================================
  const navLinks = navMenu.querySelectorAll('a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // ========================================
  // WHEN: User clicks outside the menu
  // THEN: Close the menu
  // ========================================
  document.addEventListener('click', (event) => {
    const clickedHamburger = hamburger.contains(event.target);
    const clickedMenu = navMenu.contains(event.target);
    
    // If user didn't click the hamburger or menu, close it
    if (!clickedHamburger && !clickedMenu) {
      closeMenu();
    }
  });
}