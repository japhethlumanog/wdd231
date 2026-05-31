/**
 * join.js — Sava City Chamber of Commerce
 * Handles: timestamp generation, modal open/close
 */

// ── Auto-stamp the hidden timestamp field on page load ──
(function stampTimestamp() {
  const field = document.getElementById("timestamp");
  if (!field) return;
  const now = new Date();
  field.value = now.toISOString(); // ISO string for easy parsing on thankyou page
})();

// ── Modal helpers ──
function openModal(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (dialog && typeof dialog.showModal === "function") {
    dialog.showModal();
  }
}

function closeModal(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (dialog) {
    dialog.close();
  }
}

// Close any open dialog when clicking the backdrop (outside modal content)
document.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName === "DIALOG") {
    e.target.close();
  }
});

// Close dialogs with Escape key (browsers handle this natively for <dialog>,
// but we ensure our close buttons also work)
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelectorAll("dialog[open]").forEach((d) => d.close());
  }
});