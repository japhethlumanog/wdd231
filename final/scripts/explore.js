const list = document.querySelector("#scripture-list");
const bookFilter = document.querySelector("#book-filter");
const topicFilter = document.querySelector("#topic-filter");
const memorizeFilter = document.querySelector("#memorize-filter");
const totalCount = document.querySelector("#total-count");
const memorizeCount = document.querySelector("#memorize-count");
const topicCount = document.querySelector("#topic-count");
const modal = document.querySelector("#verse-modal");
const closeModal = document.querySelector("#close-modal");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");

let allScriptures = [];

function badgeClass(book) {
  if (book === "Bible") return "badge-bible";
  if (book === "Book of Mormon") return "badge-bom";
  if (book === "Doctrine & Covenants") return "badge-dc";
  return "badge-pogp";
}

function buildTopicFilter(scriptures) {
  const topics = [...new Set(scriptures.map((s) => s.topic))].sort();
  topics.forEach((topic) => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicFilter.appendChild(option);
  });
}

function updateStats(filtered) {
  totalCount.textContent = filtered.length;
  memorizeCount.textContent = filtered.filter((s) => s.memorize).length;
  const topics = new Set(filtered.map((s) => s.topic));
  topicCount.textContent = topics.size;
}

function renderCards(scriptures) {
  if (scriptures.length === 0) {
    list.innerHTML = `<p style="color:var(--gray-600)">No verses match your filters. Try adjusting the options above.</p>`;
    updateStats([]);
    return;
  }

  list.innerHTML = scriptures
    .map(
      (verse) => `
    <article class="scripture-card" data-ref="${verse.reference}">
      <div class="card-top">
        <span class="card-reference">${verse.reference}</span>
        <span class="card-book-badge ${badgeClass(verse.book)}">${verse.book}</span>
      </div>
      <p class="card-text">"${verse.text}"</p>
      <div class="card-meta">
        <span><strong>Topic:</strong> ${verse.topic}</span>
        <span><strong>Prophet:</strong> ${verse.prophet}</span>
        <span><strong>Testament:</strong> ${verse.testament}</span>
        ${verse.memorize ? `<span class="memorize-tag">⭐ Memorize</span>` : ""}
      </div>
      <button class="card-btn" data-ref="${verse.reference}" aria-label="View full details for ${verse.reference}">
        View Details
      </button>
    </article>
  `
    )
    .join("");

  updateStats(scriptures);

  list.querySelectorAll(".card-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ref = btn.dataset.ref;
      openModal(ref);
    });
  });
}

function openModal(ref) {
  const verse = allScriptures.find((s) => s.reference === ref);
  if (!verse || !modal) return;

  modalTitle.textContent = verse.reference;
  modalBody.innerHTML = `
    <blockquote>${verse.text}</blockquote>
    <div class="modal-meta">
      <p><strong>Book:</strong> ${verse.book}</p>
      <p><strong>Testament / Collection:</strong> ${verse.testament}</p>
      <p><strong>Topic:</strong> ${verse.topic}</p>
      <p><strong>Prophet / Author:</strong> ${verse.prophet}</p>
      <p><strong>Memorize:</strong> ${verse.memorize ? "Yes ⭐" : "No"}</p>
    </div>
  `;
  modal.showModal();
}

function applyFilters() {
  const book = bookFilter.value;
  const topic = topicFilter.value;
  const mem = memorizeFilter.value;

  localStorage.setItem("se-book-filter", book);
  localStorage.setItem("se-topic-filter", topic);
  localStorage.setItem("se-memorize-filter", mem);

  const filtered = allScriptures.filter((s) => {
    const matchBook = book === "all" || s.book === book;
    const matchTopic = topic === "all" || s.topic === topic;
    const matchMem = mem === "all" || (mem === "memorize" && s.memorize);
    return matchBook && matchTopic && matchMem;
  });

  renderCards(filtered);
}

function restoreFilters() {
  const savedBook = localStorage.getItem("se-book-filter");
  const savedTopic = localStorage.getItem("se-topic-filter");
  const savedMem = localStorage.getItem("se-memorize-filter");

  if (savedBook) bookFilter.value = savedBook;
  if (savedTopic) topicFilter.value = savedTopic;
  if (savedMem) memorizeFilter.value = savedMem;
}

async function init() {
  try {
    const response = await fetch("data/scriptures.json");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    allScriptures = await response.json();

    buildTopicFilter(allScriptures);
    restoreFilters();
    applyFilters();
  } catch (err) {
    console.error("Failed to load scriptures:", err);
    list.innerHTML = `<p style="color:var(--gray-600)">Sorry, scripture data could not be loaded. Please try again later.</p>`;
  }
}

bookFilter.addEventListener("change", applyFilters);
topicFilter.addEventListener("change", applyFilters);
memorizeFilter.addEventListener("change", applyFilters);

closeModal?.addEventListener("click", () => modal.close());
modal?.addEventListener("click", (e) => {
  if (e.target === modal) modal.close();
});

init();
