// ========================================
// COPYRIGHT YEAR
// ========================================
// Find the copyright element and update it with the current year

const copyrightElement = document.getElementById('copyright');
if (copyrightElement) {
  const year = new Date().getFullYear();
  copyrightElement.innerHTML = `&copy; ${year} WDD231 – Web Frontend Development I`;
}

// ========================================
// LAST MODIFIED DATE
// ========================================
// Find the last modified element and show when the page was last updated

const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) {
  lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}