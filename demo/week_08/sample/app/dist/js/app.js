/**
 * Runs on app load
 */
function init()
{
  setCurrentPage();
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


init();
