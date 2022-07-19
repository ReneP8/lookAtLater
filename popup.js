async function fetchLinks() {
    await chrome.storage.local.get(['lalLinks'], function(result) {
        if (result && result.lalLinks) {
            const tmpLinks = result.lalLinks;
            
            tmpLinks.forEach(element => {
                const list = document.getElementById("links");
                const entry = document.createElement('li');
                const link = document.createElement('a');
                link.setAttribute('href', element);
                link.setAttribute('target', '_blank');
                link.appendChild(document.createTextNode(element));
                entry.appendChild(link);
                list.appendChild(entry);
            });            
        }  
    });
}
fetchLinks();
