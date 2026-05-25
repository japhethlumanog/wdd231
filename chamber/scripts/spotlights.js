const spotlightsEl = document.getElementById('spotlights');

function getLevelInfo(level) {
  if (level === 3) return { label: 'Gold Member',   cls: 'level-gold'   };
  if (level === 2) return { label: 'Silver Member', cls: 'level-silver' };
  return                   { label: 'Member',        cls: ''             };
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderSpotlights(members) {
  const eligible = members.filter(m => m.membershipLevel >= 2);
  if (!eligible.length) {
    spotlightsEl.innerHTML = '<p>No spotlight members available.</p>';
    return;
  }

  const count    = eligible.length >= 3 ? 3 : 2;
  const selected = shuffle(eligible).slice(0, count);

  spotlightsEl.innerHTML = selected.map(m => {
    const { label, cls } = getLevelInfo(m.membershipLevel);
    let domain = m.website;
    try { domain = new URL(m.website).hostname; } catch { /* keep full */ }

    return `
    <article class="spotlight-card">
      <img src="images/${m.image}" alt="${m.name} logo" loading="lazy"
           onerror="this.style.display='none'">
      <span class="spotlight-level ${cls}">${label}</span>
      <h3>${m.name}</h3>
      <p>${m.phone}</p>
      <p>${m.address}</p>
      <a href="${m.website}" target="_blank" rel="noopener noreferrer">${domain}</a>
    </article>`;
  }).join('');
}

async function loadSpotlights() {
  if (!spotlightsEl) return;
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const members = Array.isArray(data) ? data : data.members;
    renderSpotlights(members);
  } catch (err) {
    console.error('Spotlights error:', err);
    spotlightsEl.innerHTML = '<p class="weather-error">Spotlights could not be loaded.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadSpotlights);