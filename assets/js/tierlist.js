let draggedItem = null;
let scrollSpeed = 20;

document.querySelectorAll('.tierlist-image-list img').forEach(img => {
    img.addEventListener('dragstart', (event) => {
        draggedItem = event.target;
        event.target.classList.add('dragging');
    });

    img.addEventListener('dragend', (event) => {
        event.target.classList.remove('dragging');
        draggedItem = null;
    });
});

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    if (draggedItem) {
        event.target.closest('.tierlist-tier').querySelector('.tierlist-tier-content').appendChild(draggedItem);
    }
}

function autoScroll(event) {
    const mouseY = event.clientY;
    const contentBox = document.querySelector('.content-box');
    const boxRect = contentBox.getBoundingClientRect();

    if (mouseY < boxRect.top + 50) {
        contentBox.scrollBy(0, -scrollSpeed);
    }

    if (mouseY > boxRect.bottom - 50) {
        contentBox.scrollBy(0, scrollSpeed);
    }
}

document.addEventListener('dragover', autoScroll);

function downloadJSON() {
    const username = document.getElementById('username').value.trim() || 'user';
    const sessionNo = document.getElementById('sessionno').value.trim() || '1';

    const tierList = {
        SS: Array.from(document.querySelectorAll('#tierlist-tier-content-ss img')).map(img => img.alt),
        S: Array.from(document.querySelectorAll('#tierlist-tier-content-s img')).map(img => img.alt),
        A: Array.from(document.querySelectorAll('#tierlist-tier-content-a img')).map(img => img.alt),
        B: Array.from(document.querySelectorAll('#tierlist-tier-content-b img')).map(img => img.alt),
        C: Array.from(document.querySelectorAll('#tierlist-tier-content-c img')).map(img => img.alt),
        D: Array.from(document.querySelectorAll('#tierlist-tier-content-d img')).map(img => img.alt)
    };

    const jsonData = JSON.stringify(tierList, null, 2);

    // Erstelle das Blob-Objekt mit UTF-8-Codierung
    const blob = new Blob([jsonData], { type: 'application/json;charset=UTF-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `tierlist_${username}_${sessionNo}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function loadJSON(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const tierList = JSON.parse(e.target.result);

        document.querySelectorAll('.tierlist-tier-content').forEach(tier => {
            tier.innerHTML = '';
        });

        Object.keys(tierList).forEach(tier => {
            tierList[tier].forEach(imageAlt => {
                const img = document.querySelector(`.tierlist-image-list img[alt='${imageAlt}']`);
                if (img) {
                    document.getElementById(`tierlist-tier-content-${tier.toLowerCase()}`).appendChild(img);
                }
            });
        });

        let user = file.name.split('_')[1]
        let sessionNo = String(Number(file.name.split('_')[2].split('.')[0]) + 1)

        document.getElementById("username").value = user
        document.getElementById("sessionno").value = sessionNo
    };

    reader.readAsText(file);
}
