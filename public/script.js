saveLink = async function(resource) {
    var tmpLinks = [];
    var title = "New Link";

    var newUrl = "";

    if (resource && resource.linkUrl) {
        newUrl = resource.linkUrl;
    } else if (resource && resource.pageUrl) {
        newUrl = resource.pageUrl;
    }

    chrome.storage.local.get(['lalLinks'], function(result) {
        if (result && result.lalLinks) {
            tmpLinks = result.lalLinks;
        }
        tmpLinks.push({
            title: title,
            url: newUrl
        });
        chrome.storage.local.set({ 'lalLinks': tmpLinks }, function() {
            console.dir(tmpLinks);
        });
    });
};

chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
        id: "1",
        title: "Look at Later!",
        contexts: ["page"],
    });
    chrome.contextMenus.create({
        id: "2",
        title: "Look at Later!",
        contexts: ["link"],
    });
})

chrome.contextMenus.onClicked.addListener(saveLink);