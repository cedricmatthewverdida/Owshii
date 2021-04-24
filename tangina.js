chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.tabs.get(tabId, function(tab) {
      chrome.storage.sync.get(null, function(theValue) {
        if (theValue[tab.url] != undefined) {
          chrome.tabs.executeScript(tabId, {code: theValue[tab.url]});
        }
      });
    });
  }
})
