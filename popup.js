async function fetchLinks() {
    await chrome.storage.local.get(['lalLinks'], function(result) {
        if (result && result.lalLinks) {
            const tmpLinks = result.lalLinks;
            
            const list = document.getElementById("links");
            const entry = document.createElement('div');
            entry.setAttribute('class', 'row');

            if (tmpLinks.length == 0) {
                entry.appendChild(document.createTextNode('Keine Daten vorhanden'));
            }


            tmpLinks.forEach((element, index) => {
                const divLink = document.createElement('div');
                const divButton = document.createElement('div');
                
                divLink.setAttribute('class', 'col');
                divButton.setAttribute('class', 'col');

                //prepare button
                const button = document.createElement('button')
                button.setAttribute('class', 'btn btn-danger btn-sm m-2');
                button.setAttribute('type', 'button');
                const icon = document.createElement('icon');
                icon.setAttribute('class', 'bi bi-trash');
                button.appendChild(icon);
                button.addEventListener("click", () => deleteLink(tmpLinks, index));

                const link = document.createElement('a');
                link.setAttribute('href', element);
                link.setAttribute('target', '_blank');
                link.appendChild(document.createTextNode('Link'));
                divLink.appendChild(link);
                divButton.appendChild(button);
                entry.appendChild(divLink);
                entry.appendChild(divButton);
            });
            list.appendChild(entry);
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
