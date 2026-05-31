/**
 * join.js — Sava City Chamber of Commerce
 * Handles: timestamp generation, modal open/close via event delegation
 * No inline event handlers — all wired here.
 */

// ── Auto-stamp the hidden timestamp field on page load ──
const timestampField = document.getElementById("timestamp");
if (timestampField) {
  timestampField.value = new Date().toISOString();
}

// ── Open modals via [data-modal] buttons ──
document.querySelectorAll("[data-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dialog = document.getElementById(btn.dataset.modal);
    if (dialog) dialog.showModal();
  });
});

// ── Close modals via [data-close-modal] buttons ──
document.querySelectorAll("[data-close-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dialog = document.getElementById(btn.dataset.closeModal);
    if (dialog) dialog.close();
  });
});

// ── Close modal when clicking the backdrop ──
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
});