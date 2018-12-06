/**
 * Runs on app load
 */
function init()
{
  // checkForAppUpdates();
  setCurrentPage();
}


/**
 * Runs when index.html is loaded. This is the first page thats loaded every time
 */
function loadHomeData()
{
  checkFirstLaunch();
  var fullNameElement = document.querySelector('.js-fullname');
  var firstName = localStorage.getItem('firstName');
  var lastName = localStorage.getItem('lastName');
  fullNameElement.innerHTML = firstName + ' ' + lastName;
}


/**
 * Runs when entries.html is loaded
 */
function loadEntriesData()
{

  // var entries = [
  //   {
  //     date: "2018-11-15",
  //     weight: "32"
  //   },
  //   {
  //     date: "2018-11-16",
  //     weight: "322323"
  //   }
  // ]
  var entries = this.getEntries();
  console.log(entries);
  var entriesGroup = document.querySelector('.js-entries-group');

  // Loop through all object in the array
  for (x in entries)
  {

    var weight = entries[x].weight;
    var date = entries[x].date;
    entriesGroup.innerHTML += '\
    <li class="c-entries__button">\
      <div class="c-entries__data">\
        <p class="c-entries__weight">' + weight + 'lbs</p>\
        <p class="c-entries__date">' + date + '</p>\
      </div>\
      <div class="c-entries__actions">\
        <button onclick="deleteEntry(\'' + date + '\')">Delete</button>\
      </div>\
    </li>\
    ';
  }
  // Add row

/**
 * Get all weight entries and return it
 */
function getEntries()
{
  // Get all entries
  var entries = localStorage.getItem('weightEntries');
  // Convert the string back into an array of objects
  var parsedEntries = JSON.parse(entries);
  return parsedEntries;
}

function saveEntries(arrayOfEntries)
{
  // Convert object to string for local storage
  newUpdatedEntries = JSON.stringify(arrayOfEntries);
  // Store array of objects
  localStorage.setItem('weightEntries', newUpdatedEntries);
}

function storeWeightData()
{
  var parsedEntries = this.getEntries();

  var weightInput = document.querySelector('.js-add-weight').value;
  var dateInput = document.querySelector('.js-add-date').value;

  // Create object
  var newWeightEntry = {
    'date': dateInput,
    'weight': weightInput,
  }

  // Push new object into current array
  parsedEntries.push(newWeightEntry);

  this.saveEntries(parsedEntries);
  return document.location = 'entries.html';
}

/**
 * This function will check to see if the user has open this app before.
 * It will store data on first launch
 */
function checkFirstLaunch()
{
  // Does this browser support local storage?
  if (typeof(Storage) !== "undefined")
  {
    var firstLaunch = localStorage.getItem('firstLaunch');
    console.log(firstLaunch);
    // Check if user has downloaded and opened app.
    if (firstLaunch == 'true')
    {
      return;
    }

    // If first time launching app, update item from storage and redirect to landing page
    firstLaunch = localStorage.setItem('firstLaunch', true);
    // Set all Default values for the app
    localStorage.setItem('currentWeight', 0);
    localStorage.setItem('startWeight', 0);
    localStorage.setItem('weightChange', 0);
    localStorage.setItem('weightEntries', '[]');

    return location.href = 'landing.html';
  }
  else
  {
    // Sorry! No Web Storage support..
    alert('This browser does NOT support local storage');
  }

}

/**
 * Save the users profile from the landing page
 */
function saveProfile()
{
  var firstName = document.querySelector('#firstName').value;
  var lastName = document.querySelector('#lastName').value;
  var unit = document.querySelector('#unit').value;

  localStorage.setItem('firstName', firstName);
  localStorage.setItem('lastName', lastName);
  localStorage.setItem('unit', unit);
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

function checkForAppUpdates()
{
  window.applicationCache.addEventListener('updateready', function(e)
  {
    if (window.applicationCache.status === window.applicationCache.UPDATEREADY)
    {
      if (confirm('Updates are available for this mobile web app. Load them?'))
      {
        window.applicationCache.swapCache();
        window.location.reload();
      }
    }
  });
}

init();
