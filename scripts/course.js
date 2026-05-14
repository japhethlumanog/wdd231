// ========================================
// COURSE DATA
// ========================================
// This is a list of all courses with information about each one

const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will teach the beginning programmer how to use functions, error handling, and unit testing in their programs.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the Object Oriented Programming (OOP) paradigm to the student.',
    technology: ['C#'],
    completed: true 
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming fundamentals to introduce dynamic web development.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming fundamentals to develop responsive websites.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

// ========================================
// GET ELEMENTS FROM HTML
// ========================================
// Find the HTML elements we need to work with

const courseCardsContainer = document.getElementById('course-cards');
const totalCreditsDisplay = document.getElementById('credit-count');
const filterButtons = document.querySelectorAll('.filter-btn');

// ========================================
// FILTER COURSES
// ========================================
// This function returns only the courses we want to show

function getFilteredCourses(filterType) {
  // If filter is 'all', show everything
  if (filterType === 'all') {
    return courses;
  }
  
  // Otherwise, only show courses that match the filter
  // (e.g., if filterType is 'WDD', only show WDD courses)
  return courses.filter(course => course.subject === filterType);
}

// ========================================
// CALCULATE TOTAL CREDITS
// ========================================
// Count up all the credits in a list of courses

function calculateTotalCredits(courseList) {
  let total = 0;
  
  for (let i = 0; i < courseList.length; i++) {
    total = total + courseList[i].credits;
  }
  
  return total;
}

// ========================================
// CREATE ONE COURSE CARD
// ========================================
// Turn one course object into an HTML card

function createCourseCard(course) {
  // Create a new article element (a card)
  const card = document.createElement('article');
  card.classList.add('course-card');
  
  // If course is completed, add special styling
  if (course.completed) {
    card.classList.add('completed');
  }
  
  // Create the HTML inside the card
  const status = course.completed ? '✓ Done' : 'Pending';
  const statusLabel = course.completed ? 'Completed' : 'In Progress';
  
  card.innerHTML = `
    <div>
      <p class="course-name">${course.subject} ${course.number}: ${course.title}</p>
      <p class="course-credits">${course.credits} cr</p>
    </div>
    <span class="badge" aria-label="${statusLabel}">
      ${status}
    </span>
  `;
  
  return card;
}

// ========================================
// DISPLAY ALL COURSES
// ========================================
// Show the filtered courses on the page

function displayCourses(filterType) {
  // Get only the courses we want to show
  const coursesToShow = getFilteredCourses(filterType);
  
  // Clear out the old courses
  courseCardsContainer.innerHTML = '';
  
  // Add each course card to the page
  for (let i = 0; i < coursesToShow.length; i++) {
    const card = createCourseCard(coursesToShow[i]);
    courseCardsContainer.appendChild(card);
  }
  
  // Update the total credits display
  const total = calculateTotalCredits(coursesToShow);
  totalCreditsDisplay.textContent = total;
}

// ========================================
// SET UP FILTER BUTTONS
// ========================================
// When user clicks a filter button, show only those courses

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add 'active' class to the clicked button
    button.classList.add('active');
    
    // Get the filter type from the button (e.g., 'all', 'WDD', 'CSE')
    const filterType = button.dataset.filter;
    
    // Show the filtered courses
    displayCourses(filterType);
  });
});

// ========================================
// START: Show all courses when page loads
// ========================================
displayCourses('all');