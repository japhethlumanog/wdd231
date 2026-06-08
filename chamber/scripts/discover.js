import { attractions } from '../data/attractions.mjs';

// ═══ CONSTANTS ═══
const VISITOR_STORAGE_KEY = 'lastVisit';
const MILLISECONDS_PER_DAY = 86400000; // 24 hours in milliseconds

// ═══ INITIALIZE PAGE ═══
document.addEventListener('DOMContentLoaded', () => {
  displayVisitorMessage();
  renderAttractions();
  updateLastVisitDate();
});

// ═══ VISITOR MESSAGE LOGIC ═══
function displayVisitorMessage() {
  const messageEl = document.getElementById('visitor-message');
  const lastVisitStr = localStorage.getItem(VISITOR_STORAGE_KEY);

  if (!lastVisitStr) {
    // First visit
    messageEl.textContent = 'Welcome! Let us know if you have any questions.';
    messageEl.classList.add('first-visit');
  } else {
    const lastVisitTime = parseInt(lastVisitStr, 10);
    const currentTime = Date.now();
    const timeDiff = currentTime - lastVisitTime;
    const daysDiff = Math.floor(timeDiff / MILLISECONDS_PER_DAY);

    if (daysDiff === 0) {
      // Less than 1 day
      messageEl.textContent = 'Back so soon! Awesome!';
    } else {
      // More than 1 day
      const dayWord = daysDiff === 1 ? 'day' : 'days';
      messageEl.textContent = `You last visited ${daysDiff} ${dayWord} ago.`;
    }
  }
}

// ═══ UPDATE LAST VISIT DATE ═══
function updateLastVisitDate() {
  localStorage.setItem(VISITOR_STORAGE_KEY, Date.now().toString());
}

// ═══ RENDER ATTRACTIONS ═══
function renderAttractions() {
  const container = document.getElementById('attractions-grid');

  const html = attractions
    .map(
      (attraction) => `
    <article class="attraction-card">
      <h2>${attraction.name}</h2>
      <figure>
        <img
          src="${attraction.image}"
          alt="${attraction.name}"
          loading="lazy"
          width="300"
          height="200"
        />
      </figure>
      <address>${attraction.address}</address>
      <p>${attraction.description}</p>
      <button>Learn More</button>
    </article>
  `
    )
    .join('');

  container.innerHTML = html;

  // Add click handlers to buttons
  container.querySelectorAll('button').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const attraction = attractions[index];
      handleLearnMore(attraction);
    });
  });
}

// ═══ HANDLE LEARN MORE BUTTON ═══
function handleLearnMore(attraction) {
  // Optional: Add functionality here
  // For example, open a modal, navigate to a detail page, or show more info
  console.log('Learn more about:', attraction.name);
  alert(`${attraction.name}\n\n${attraction.address}\n\n${attraction.description}`);
}
