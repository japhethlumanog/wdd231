// Footer date script used on every page.
const copyright = document.querySelector("#copyright");
const lastModified = document.querySelector("#lastModified");

if (copyright) {
  copyright.textContent = `© ${new Date().getFullYear()} Japheth James D. Lumanog. All rights reserved.`;
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}
