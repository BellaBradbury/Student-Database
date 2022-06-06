/*
Treehouse Techdegree: Data Pagination and Filtering
*/

// GLOBAL VARIABLES
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const pageHeader = document.querySelector('.header');

// INSERT SEARCH BAR ONTO DOCUMENT
let searchBar = `
  <label for="search" class="student-search">
    <span>Search by name</span>
    <input id="search" placeholder="Search by name...">
    <button type="button" class="search-button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>
`;
pageHeader.insertAdjacentHTML('beforeend', searchBar);

// INSERTS UP TO 9 STUDENT PROFILES PER PAGE ONTO DOCUMENT
function showPage(list, page) {
  const startIndex = (page * 9) - 9;
  const endIndex = page * 9;
  studentList.innerHTML = '';

  for ( let i = 0; i < list.length; i++ ) {
    if ( i >= startIndex && i < endIndex ) {
      let studentProfile = `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${list[i].picture.thumbnail}" alt="${list[i].name}'s Profile Picture">
            <h3 class="student-name">${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
          </div>
        </li>
      `;

      studentList.insertAdjacentHTML('beforeend', studentProfile);
    }
  }
}


// CREATES PAGE NUMBER BUTTONS AND
  // ACTIVATES/DEACTIVATES BUTTONS WHEN CLICKED ON/OFF
function addPagination(list) {
  let pagesLength = Math.ceil(list.length / 9);
  linkList.innerHTML = '';

  for ( let i = 0; i < pagesLength; i++ ) {
    let pageCode = `
      <li>
        <button type="button">${i}</button>
      </li>
    `;

    linkList.insertAdjacentHTML('beforeend', pageCode);
  }

  let pageOne = linkList.firstElementChild;
  pageOne.classList.add('active');

  linkList.addEventListener('click', (e) => {
    const targetPage = e.target;

    if (targetPage.tagName === 'BUTTON') {
      targetPage.classList.add('active');
      let activePage = document.querySelector('.active');
      activePage.classList.remove('active');
      showPage(list, targetPage.textContent);
    }
  });
}

// ALLOWS FUNCTION OF SEARCH BAR
function searchProfiles() {
  const names = document.querySelector('.student-name').innerHTML;
  const namesTrue = names.value.toUpperCase();
  const namesList = namesTrue.filter();

  if (namesList.length > 0) {
    showPage(namesList, 1);
    addPagination(namesList);
  } else if (namesList === 0) {
    const noMatch = `<h2>Sorry, there are no profiles that match your search.</h2>`;
    studentList.innerHTML = '';
    studentList.insertAdjacentHTML('afterbegin', noMatch);
  }
}

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search');

searchButton.addEventListener('click', (e) => {
  searchButton = e.target;
  e.preventDefault();
  searchProfiles(search, data);
});

searchInput.addEventListener('keyup', () => {
  searchProfiles(search, data);
});

// CALL FUNCTIONS FOR PAGE LAYOUT
showPage(data, 1);
addPagination(data);
