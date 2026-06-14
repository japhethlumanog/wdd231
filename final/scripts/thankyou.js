const results = document.querySelector("#results");
const params = new URLSearchParams(window.location.search);

// This action page reads the submitted form data and prints it on the page.
if (results) {
  const entries = Array.from(params.entries());

  if (entries.length === 0) {
    results.innerHTML = "<p>No form information was received.</p>";
  } else {
    results.innerHTML = `
      <dl class="result-list">
        ${entries
          .map(
            ([key, value]) => `
              <div>
                <dt>${key.replaceAll("-", " ")}</dt>
                <dd>${value}</dd>
              </div>
            `
          )
          .join("")}
      </dl>
    `;
  }
}
