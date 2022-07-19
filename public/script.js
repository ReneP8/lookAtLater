saveLink = function(link){
    var tmpLinks = [];

    chrome.storage.local.get(['lalLinks'], function(result) {
        if (result && result.lalLinks) {
            tmpLinks = result.lalLinks;
        }
        tmpLinks.push(link.linkUrl);
        chrome.storage.local.set({'lalLinks': tmpLinks}, function() {
            console.dir(tmpLinks);
        });   
      });
};

chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
     id: "1",
     title: "Look at Later!",
     contexts:["link"],
    }); })

chrome.contextMenus.onClicked.addListener(saveLink);