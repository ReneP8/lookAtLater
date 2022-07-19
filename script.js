saveLink = function(link){
    console.log(link.linkUrl);
};

chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
     id: "1",
     title: "Look at Later!",
     contexts:["link"],
    }); })

chrome.contextMenus.onClicked.addListener(saveLink);