saveLink = async function(link) {
    var tmpLinks = [];

    var title = "New Link";

    chrome.storage.local.get(['lalLinks'], function(result) {
        if (result && result.lalLinks) {
            tmpLinks = result.lalLinks;
        }
        tmpLinks.push({
            title: title,
            url: link.linkUrl
        });
        chrome.storage.local.set({ 'lalLinks': tmpLinks }, function() {
            console.dir(tmpLinks);
        });
    });

    // await fetch(`https://title-for-url.herokuapp.com/api/title?url=${link.linkUrl}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.title && data.title.length > 0) {
    //             title = data.title;
    //         }

    //     });
};

chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
        id: "1",
        title: "Look at Later!",
        contexts: ["link"],
    });
})

chrome.contextMenus.onClicked.addListener(saveLink);