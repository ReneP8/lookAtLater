async function fetchLinks() {
    await chrome.storage.local.get(['lalLinks'], function(result) {
        if (result && result.lalLinks) {
            const tmpLinks = result.lalLinks;
            
            tmpLinks.forEach((element, index) => {
                const list = document.getElementById("links");
                const entry = document.createElement('li');
                const button = document.createElement('button')
                button.setAttribute('class', 'btn btn-danger');
                button.setAttribute('type', 'button');
                const icon = document.createElement('icon');
                icon.setAttribute('class', 'bi bi-trash');
                button.appendChild(icon);
                button.addEventListener("click", () => deleteLink(tmpLinks, index));
                const link = document.createElement('a');
                link.setAttribute('href', element);
                link.setAttribute('target', '_blank');
                link.appendChild(document.createTextNode(element));
                entry.appendChild(link);
                entry.appendChild(button);
                list.appendChild(entry);
            });            
        }  
    });
}

async function deleteLink(tmpLinks, index) {
    tmpLinks.splice(index, 1);
    chrome.storage.local.set({'lalLinks': tmpLinks}, function() {
        console.dir(tmpLinks);
    });
    window.location.reload();
}

fetchLinks();
