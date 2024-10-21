let draggedItem = null;
let scrollSpeed = 20;  // Geschwindigkeit des Scrollens

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

// Funktion für das automatische Scrollen am Rand
function autoScroll(event) {
    const mouseY = event.clientY;
    const windowHeight = window.innerHeight;

    // Am oberen Rand scrollen
    if (mouseY < 50) {
        window.scrollBy(0, -scrollSpeed);
    }

    // Am unteren Rand scrollen
    if (mouseY > windowHeight - 50) {
        window.scrollBy(0, scrollSpeed);
    }
}

// Überwachung der Mausbewegung während des Draggens
document.addEventListener('dragover', autoScroll);

function downloadJSON() {
    const tierList = {
        S: Array.from(document.querySelectorAll('#tierlist-tier-content-s img')).map(img => img.alt),
        A: Array.from(document.querySelectorAll('#tierlist-tier-content-a img')).map(img => img.alt),
        B: Array.from(document.querySelectorAll('#tierlist-tier-content-b img')).map(img => img.alt),
        C: Array.from(document.querySelectorAll('#tierlist-tier-content-c img')).map(img => img.alt),
        D: Array.from(document.querySelectorAll('#tierlist-tier-content-d img')).map(img => img.alt)
    };

    const jsonData = JSON.stringify(tierList, null, 2);
    const blob = new Blob([jsonData], {type: 'application/json'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'tierlist.json';
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
    };

    reader.readAsText(file);
}
