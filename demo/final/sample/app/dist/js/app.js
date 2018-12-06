/**
 * Runs on app load
 */
function init()
{
  setCurrentPage();
}

/**
 * This function will check to see if the user has open this app before.
 * It will store data on first launch
 */
function checkFirstLaunch(){
  // Check to see if local storage is supported
  if (typeof(Storage) !== "undefined") {
    // Browser supports local storage
    var firstLaunch = localStorage.getItem('firstLaunch');
    console.log(firstLaunch);

    // Check if user has downloaded and opened the app
    if (firstLaunch == 'true') {
      return;
    }

    // If first time launching app, update item from storage and redirect to landing page
    localStorage.setItem('firstLaunch', true);
    // Set all Default values for the app
    localStorage.setItem('currentWeight', 0);
    localStorage.setItem('startWeight', 0);
    localStorage.setItem('weightChange', 0);
    localStorage.setItem('weightEntries', '[]');

    return location.href = 'landing.html';

  } else {
    // Sorry! No Web Storage support..
    alert('This browser does NOT support local storage');
  }
}

function loadHomePage() {
  console.log('Home Page Loaded');
  // Check to see if this is the first launch
  this.checkFirstLaunch();

  // Update the page with users full name
  // Grab the element from the page and assign it to a variable
  var fullNameElement = document.querySelector('.js-fullname');

  // Get the first and last name from local storage
  var firstName = localStorage.getItem('firstName');
  var lastName = localStorage.getItem('lastName');

  // Update the HTML on the page with the users full name
  fullNameElement.innerHTML = firstName + ' ' +  lastName;
}

/**
 * This will save the users basic info on first load
 */
function saveProfile() {
  // Get the values of ever input field
  var firstName = document.querySelector('#firstName').value;
  var lastName = document.querySelector('#lastName').value;
  var unit = document.querySelector('#unit').value;

  // store those values into our local storage
  localStorage.setItem('firstName', firstName);
  localStorage.setItem('lastName', lastName);
  localStorage.setItem('unit', unit);

  // Redirect the user to the home page
  return location.href = 'index.html';
}

/**
 * This will detect what page you're on and add the class 'is-current'.
 * Element must have `data-page` attribute
 */
function setCurrentPage()
{
  var page = window.location.pathname;
  var currentPage = document.querySelector('[data-page="' + page + '"]');

  currentPage.classList.add('is-current');
}

/**
 * Will route to the page you want to go to.
 *
 * @param {string} pathToPage - path to the page you want to link to
 */
function routeTo(thisButton)
{
  var navigationItems = document.querySelectorAll('.c-nav-main__button');
  var pathToPage = thisButton.getAttribute('data-page');

  // Loop through each nav item and remove the is-current class
  navigationItems.forEach(function(item)
  {
    item.classList.remove("is-current");
  });

  // Add class to create active button style
  thisButton.classList.add('is-current');

  // Direct user to new page
  return location.href = pathToPage;
}

function getEntriesData() {
  // Get all entries
  var entries = localStorage.getItem('weightEntries');
  // Convert string
  var parsedEntries = JSON.parse(entries);

  // Return the string
  return parsedEntries;
}

function storeWeightData() {
  // weightEntries = [
  //   {
  //     'date': '12/10/18',
  //     'weight': '200'
  //   },
  //   {
  //     'date': '12/11/18',
  //     'weight': '205'
  //   },
  //   {
  //     'date': '12/12/18',
  //     'weight': '210'
  //   }
  // ]
   var parsedEntries = this.getEntriesData();

  // Grab values from input field
  var weightInput = document.querySelector('.js-add-weight').value;
  var dateInput = document.querySelector('.js-add-date').value;

  // Create object
  var newWeightEntry = {
    'date': dateInput,
    'weight': weightInput
  };

  parsedEntries.push(newWeightEntry);

  // Convert object to string for local storage
  newUpdatedEntries = JSON.stringify(parsedEntries);

  // Store array of objects
  localStorage.setItem('weightEntries', newUpdatedEntries);

  return location.href = 'entries.html';

  // Create an object and store it
  // Push new object into current array
  // Save new array
  // Go to entries page
}

/**
 * Its going to go into our local storage, loop through all entries and spit them
 * out on the screen
 */
function loadEntries()
{
  var entries = this.getEntriesData();

  // Get group element
  var entriesGroup = document.querySelector('.js-entries-group');
  // Loop through all of the entries and create a row and display html
  for (objectKey in entries) {
    // Grab weight and date values
    var weight = entries[objectKey].weight;
    var date = entries[objectKey].date;
    entriesGroup.innerHTML += '\
    <li class="c-entries__button"> \
      <div class="c-entries__data">\
        <p class="c-entries__weight">'+ weight +'lb</p>\
        <p class="c-entries__date">'+ date +'</p>\
      </div>\
      <div class="c-entries__actions">\
        <button>Delete</button>\
      </div>\
    </li> ';
    // Create Custom html and display it

  }
}
init();
