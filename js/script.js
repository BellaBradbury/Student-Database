/* ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---- GLOBAL VARIABLES */
const searchCot = document.getElementsByTagName('header')[0];
const listCot = document.getElementsByClassName('student-list')[0];
const pageCot = document.getElementsByClassName('link-list')[0];

const itmCount = 9;
let searchMatches = [];


/* ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- -------- HTML INSERTS */
/* STUDENT DATA */
function studentHTML(i) {
   let fullName = `${i.name.first} ${i.name.last}`;
   let html = `<li class="student-item sf">
                  <div class="student-details">
                     <img class="avatar" src="${i.picture.thumbnail}" alt="Professional photo of ${fullName}">
                     <h3>${fullName}</h3>
                     <span class="email">${i.email}</span>
                  </div>
                  <div class="joined-details">
                     <span class="date">Joined ${i.registered.date}</span>
                  </div>
               </li>`;
   return html
}
const emptyStudent = `<li class="student-item sb"></li>`;

/* PAGINATION */
function paginationHTML(i) {
   let html =  `<li>
                  <button type="button" class="page-btn">${i}</button>
               </li>`;
   return html
}

/* SEARCH */
const searchBar = `<label for="search" class="student-search">
                     <span>Search by name</span>
                     <input id="search" placeholder="Search by name...">
                     <button type="button" class='search-btn'>
                        <img src="img/icn-search.svg" alt="Search icon">
                     </button>
                     <button type="button" class='clear-btn'>X</button>
                  </label>`
function noResults(input) {
   const html = `<div class="no-results">
                     <h3>THERE ARE NO RESULTS FOR <strong>${input}</strong></h3>
                     <p>Please try again!</p>
                  </div>`
   return html
}



/* ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ------- STUDENT CARDS */
/* LOOPS THROUGH STUDENT ARR TO ADD TO PAGE BASED ON PAGINATION */
function showPage(list, page) {
   listCot.innerHTML = '';

   let start = (page * itmCount) - itmCount;
   let end = (page * itmCount);

   for (let i = start; i < end; i++) {
      const student = list[i];
      if (student) {
         listCot.insertAdjacentHTML( "beforeend", studentHTML(student) );   
      } else {
         listCot.insertAdjacentHTML('beforeend', emptyStudent);
      }
   }
}


/* ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- PAGINATION */
/* CREATES ACCURATE AMOUNT OF PAGE BUTTONS DEPENDING ON STUDENT COUNT */
function addPagination(list) {
   pageCot.innerHTML = '';

   let pageCount = Math.ceil( (list.length / itmCount) );
   if (pageCount > 1) {
      for (let i = 1; i <= pageCount; i++) {
         pageCot.insertAdjacentHTML( 'beforeend', paginationHTML(i) );
      }
   } 
}

/* SETS THE FIRST PAGE BUTTON AS ACTIVE */
function activateBtn() {
   const firstPage = document.getElementsByClassName('page-btn')[0];
   if (firstPage) {
      firstPage.classList.add('active');
   }
}

/* ALLOWS FOR PAGE UPDATE BASED ON BUTTON CLICKED */
function changePage(btn) {
   /* previous page button */
   let prevBtn = document.getElementsByClassName('active')[0];
   prevBtn.classList.remove('active');
  
   /* new page button */
   btn.classList.add('active');
   let newPage = parseInt(btn.innerHTML);
   showPage(data, newPage);
}


/* ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- --- SEARCH */
/* VALIDATES IF SEARCH INPUT MATCHES ANY STUDENT DATA */
function searchTest(searchInput, item) {
   let input = searchInput.toLowerCase();
   let name = `${item.name.first} ${item.name.last}`.toLowerCase();
   let email = `${item.email}`.toLowerCase();
   let date = `${item.registered.date}`;

   if ( name.includes(input) ) {
      return true
   } else if ( email.includes(input) ) {
      return true
   } else if ( date.includes(input) ) {
      return true
   } else {
      return false
   }
}

/* MAINTAINS & UPDATES LIST OF MATCHED USERS */
function searchList(input, list) {
   searchMatches = [];
   list.forEach(item => {
      let test = searchTest(input, item);
      if (test) {
         searchMatches.push(item);
      }
   });
}

/* USES GATHERED SEARCH DATA TO DISPLAY EITHER MATCHES OR A NO RESULTS MESSAGE */
function showSearch(input, list) {
   addPagination(list)

   if (list.length > 0) {
      showPage(list, 1)
      activateBtn()
   } else {
      listCot.innerHTML = '';
      listCot.innerHTML = noResults( input.toUpperCase() );
   }
}


/* ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- - APP INIT */
searchCot.insertAdjacentHTML('beforeend', searchBar);
let searchInput = document.getElementById('search');

function appInit() {
   searchInput.value = '';
   showPage(data, 1);
   addPagination(data);
   activateBtn();
}
appInit()


/* ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- --- EVENTS */
/* PAGINATION */
function paginationEvent(e) {
   let element = e.target;
   let pageBtns = Array.from( document.getElementsByClassName('page-btn') );

   if ( pageBtns.includes(element) ) {
      changePage(element)
   }
}

document.addEventListener( 'click', (e) => { paginationEvent(e) } );
document.addEventListener( 'keyup', (e) => { if (e.key === 'Enter') { paginationEvent(e) } } );

/* SEND SEARCH */
const searchBtn = document.getElementsByClassName('search-btn')[0];
function sendSearch() {
   let input = searchInput.value;
   searchList(input, data);
   showSearch(input, searchMatches);
}

searchInput.addEventListener( 'keyup', (e) => { sendSearch() } );
searchBtn.addEventListener( 'click', (e) => { sendSearch() } );
searchBtn.addEventListener( 'keyup', (e) => { if (e.key === 'Enter') { sendSearch() } } );

/* CLEAR SEARCH */
const clearBtn = document.getElementsByClassName('clear-btn')[0];

clearBtn.addEventListener( 'click', (e) => { appInit() } );
clearBtn.addEventListener( 'keyup', (e) => { if (e.key === 'Enter') { appInit() } } );


/* ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- */
/* Bella Bradbury, 2023 */
