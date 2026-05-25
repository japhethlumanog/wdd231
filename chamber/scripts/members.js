const membersArea = document.querySelector("#members");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersArea.innerHTML = "<p>Member information could not be loaded.</p>";
  }
}

function displayMembers(members) {
  membersArea.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const levelName = getLevelName(member.membershipLevel);

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <div>
        <h3>${member.name}</h3>
        <p class="member-description">${member.description}</p>
      </div>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
      <p class="member-level">${levelName} Member</p>
    `;

    membersArea.appendChild(card);
  });
}

function getLevelName(level) {
  if (level === 3) {
    return "Gold";
  }

  if (level === 2) {
    return "Silver";
  }

  return "Basic";
}

gridButton.addEventListener("click", () => {
  membersArea.classList.add("members-grid");
  membersArea.classList.remove("members-list");
  gridButton.classList.add("active");
  listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
  membersArea.classList.add("members-list");
  membersArea.classList.remove("members-grid");
  listButton.classList.add("active");
  gridButton.classList.remove("active");
});

getMembers();
