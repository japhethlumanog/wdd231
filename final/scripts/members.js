const memberContainer = document.querySelector("#members");
const categoryFilter = document.querySelector("#category");
const membershipFilter = document.querySelector("#membership");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
let members = [];
let currentView = localStorage.getItem("directoryView") || "grid";

// Fetch API requirement: loads the local JSON file asynchronously.
async function getMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("The member data could not be loaded.");
    }

    members = await response.json();
    displayMembers(members);
    updateStats(members);
  } catch (error) {
    memberContainer.innerHTML = `<p>${error.message}</p>`;
  }
}

// Dynamic content requirement: creates 15 business cards from the JSON data.
function displayMembers(memberList) {
  if (!memberContainer) return;

  memberContainer.className = currentView === "grid" ? "directory-grid" : "directory-list";

  if (memberList.length === 0) {
    memberContainer.innerHTML = "<p>No members match that filter.</p>";
    return;
  }

  memberContainer.innerHTML = memberList
    .map((member) => {
      return `
        <article class="member-card ${currentView === "list" ? "list" : ""}">
          <div class="member-visual">
            <img src="${member.image}" alt="${member.name}">
          </div>
          <span class="badge">${member.membership} Member</span>
          <h3>${member.name}</h3>
          <p>${member.description}</p>
          <ul class="member-meta">
            <li><strong>Category:</strong> ${member.category}</li>
            <li><strong>Address:</strong> ${member.address}</li>
            <li><strong>Phone:</strong> ${member.phone}</li>
            <li><strong>Hours:</strong> ${member.hours}</li>
          </ul>
          <button type="button" data-member="${member.name}">Details</button>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll("[data-member]").forEach((button) => {
    button.addEventListener("click", () => openMemberModal(button.dataset.member));
  });
}

// Array method requirement: filter processes the members based on form choices.
function applyFilters() {
  const category = categoryFilter.value;
  const membership = membershipFilter.value;

  const filteredMembers = members.filter((member) => {
    const categoryMatch = category === "all" || member.category === category;
    const membershipMatch = membership === "all" || member.membership === membership;
    return categoryMatch && membershipMatch;
  });

  displayMembers(filteredMembers);
}

function setView(view) {
  currentView = view;
  localStorage.setItem("directoryView", view);
  gridButton.classList.toggle("active", view === "grid");
  listButton.classList.toggle("active", view === "list");
  applyFilters();
}

function updateStats(memberList) {
  document.querySelector("#member-count").textContent = memberList.length;
  document.querySelector("#gold-count").textContent = memberList.filter((member) => member.membership === "Gold").length;
  document.querySelector("#category-count").textContent = new Set(memberList.map((member) => member.category)).size;
}

// Modal requirement: shows one member's complete information in a dialog.
function openMemberModal(memberName) {
  const modal = document.querySelector("#member-modal");
  const title = document.querySelector("#modal-title");
  const body = document.querySelector("#modal-body");
  const member = members.find((item) => item.name === memberName);

  if (!modal || !member) return;

  title.textContent = member.name;
  body.innerHTML = `
    <p>${member.description}</p>
    <ul class="member-meta">
      <li><strong>Category:</strong> ${member.category}</li>
      <li><strong>Membership:</strong> ${member.membership}</li>
      <li><strong>Address:</strong> ${member.address}</li>
      <li><strong>Phone:</strong> ${member.phone}</li>
      <li><strong>Hours:</strong> ${member.hours}</li>
      <li><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></li>
    </ul>
  `;
  modal.showModal();
}

categoryFilter?.addEventListener("change", applyFilters);
membershipFilter?.addEventListener("change", applyFilters);
gridButton?.addEventListener("click", () => setView("grid"));
listButton?.addEventListener("click", () => setView("list"));
document.querySelector("#close-modal")?.addEventListener("click", () => document.querySelector("#member-modal")?.close());

if (gridButton && listButton) {
  gridButton.classList.toggle("active", currentView === "grid");
  listButton.classList.toggle("active", currentView === "list");
}

getMembers();
