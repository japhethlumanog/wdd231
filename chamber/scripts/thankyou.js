/**
 * thankyou.js — Sava City Chamber of Commerce
 * Reads GET params from the URL and populates the submission details card.
 */

(function () {
  const params = new URLSearchParams(window.location.search);

  const fields = [
    ["fname",     "First Name"],
    ["lname",     "Last Name"],
    ["email",     "Email Address"],
    ["mobile",    "Mobile Phone"],
    ["org-name",  "Organization Name"],
    ["timestamp", "Submitted At"],
  ];

  const levelLabels = {
    np:     "NP Membership (Non-Profit — Free)",
    bronze: "Bronze Membership",
    silver: "Silver Membership",
    gold:   "Gold Membership",
  };

  const container = document.getElementById("submission-rows");
  if (!container) return;

  fields.forEach(([key, label]) => {
    let value = params.get(key) || "";

    // Format the ISO timestamp into a readable string
    if (key === "timestamp" && value) {
      try {
        const d = new Date(value);
        value = d.toLocaleString("en-PH", {
          dateStyle: "long",
          timeStyle: "short",
        });
      } catch (_) { /* keep raw if parse fails */ }
    }

    const row = document.createElement("div");
    row.className = "submission-row";

    const keyEl = document.createElement("span");
    keyEl.className = "submission-key";
    keyEl.textContent = label;

    const valEl = document.createElement("span");
    valEl.className = value ? "submission-val" : "submission-val empty";
    valEl.textContent = value || "—";

    row.appendChild(keyEl);
    row.appendChild(valEl);
    container.appendChild(row);
  });

  // Insert membership level before the last row (timestamp)
  const membershipVal = params.get("membership");
  if (membershipVal) {
    const row = document.createElement("div");
    row.className = "submission-row";

    const keyEl = document.createElement("span");
    keyEl.className = "submission-key";
    keyEl.textContent = "Membership Level";

    const valEl = document.createElement("span");
    valEl.className = "submission-val";
    valEl.textContent = levelLabels[membershipVal] || membershipVal;

    row.appendChild(keyEl);
    row.appendChild(valEl);

    const rows = container.querySelectorAll(".submission-row");
    const lastRow = rows[rows.length - 1];
    container.insertBefore(row, lastRow);
  }
})();