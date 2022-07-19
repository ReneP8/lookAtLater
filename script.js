saveLink = function(link){
    chrome.storage.local.set({'link': link.linkUrl}, function() {
        console.log('Value is set to ' + link.linkUrl);
      });

      chrome.storage.local.get(['link'], function(result) {
        console.dir(result.link);
      });
};

chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
     id: "1",
     title: "Look at Later!",
     contexts:["link"],
    }); })

chrome.contextMenus.onClicked.addListener(saveLink);