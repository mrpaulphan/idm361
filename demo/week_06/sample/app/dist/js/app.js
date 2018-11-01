function checkForAppUpdates()
{
  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status === window.applicationCache.UPDATEREADY)
    {
      if ( confirm('Updates are available for this mobile web app. Load them?') )
      {
        window.applicationCache.swapCache();
        window.location.reload();
      }
    }
  });
}
