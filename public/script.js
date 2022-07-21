saveLink = async function (link) {
    var tmpLinks = [];

    var title = "";

    await fetch(`https://title-for-url.herokuapp.com/api/title?url=${link.linkUrl}`)
        .then(response => response.json())
        .then(data => {
            title = data.title;
            chrome.storage.local.get(['lalLinks'], function (result) {
                if (result && result.lalLinks) {
                    tmpLinks = result.lalLinks;
                }
                tmpLinks.push({
                    title: title,
                    url: link.linkUrl
                });
                chrome.storage.local.set({ 'lalLinks': tmpLinks }, function () {
                    console.dir(tmpLinks);
                });
            });
        });
};

chrome.contextMenus.removeAll(function () {
    chrome.contextMenus.create({
        id: "1",
        title: "Look at Later!",
        contexts: ["link"],
    });
})

chrome.contextMenus.onClicked.addListener(saveLink);