// thankyou.js — Read URL parameters from the study goal form and display them.

const results = document.querySelector("#results");

const labels = {
  "first-name": "First Name",
  "last-name": "Last Name",
  email: "Email Address",
  phone: "Phone Number",
  "standard-work": "Favorite Standard Work",
  frequency: "Study Frequency",
  "favorite-verse": "Favorite Verse",
  "goal-notes": "Study Goal",
};

function displayFormData() {
  const params = new URLSearchParams(window.location.search);
  const skip = ["submitted"];
  const entries = [...params.entries()].filter(
    ([key]) => !skip.includes(key) && labels[key]
  );

  if (entries.length === 0) {
    results.innerHTML = `<p style="color:var(--gray-600)">No form data was found. Please <a href="study.html" style="color:var(--navy);text-decoration:underline">go back and fill out the form</a>.</p>`;
    return;
  }

  const html = entries
    .filter(([, value]) => value.trim())
    .map(
      ([key, value]) => `
      <div class="result-row">
        <span class="result-key">${labels[key] ?? key}</span>
        <span class="result-val">${value}</span>
      </div>`
    )
    .join("");

  results.innerHTML = html;
}

displayFormData();
