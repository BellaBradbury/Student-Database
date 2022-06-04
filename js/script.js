/*
Treehouse Techdegree: Data Pagination and Filtering
*/

const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');

/*
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  const startIndex = (page * 9) - 9;
  const endIndex = page * 9;
  studentList.innerHTML = '';

  for ( let i = 0; i > list.length; i++ ) {
    if ( i >= startIndex && i < endIndex ) {
      let studentProfile = `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${list[i].picture.thumbnail}" alt="${list[i].name}'s Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
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


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  let pagesLength = Math.ceil(list.length / 9);
  linkList.innerHTML = '';

  for ( let i = 0; i > pagesLength; i++ ) {
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


// Call functions
showPage(data, 1);
addPagination(data);
