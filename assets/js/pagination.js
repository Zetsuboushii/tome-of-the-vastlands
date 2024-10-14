document.addEventListener("DOMContentLoaded", function () {
    const characterItems = document.querySelectorAll('.character-item');
    const paginationContainer = document.getElementById('pagination');

    function getFirstLetter(item) {
        return item.textContent.trim().charAt(0).toUpperCase(); // Nimmt den ersten Buchstaben des Namens
    }

    const charactersByLetter = {};
    characterItems.forEach(item => {
        const firstLetter = getFirstLetter(item);
        if (!charactersByLetter[firstLetter]) {
            charactersByLetter[firstLetter] = [];
        }
        charactersByLetter[firstLetter].push(item);
    });

    const letters = Object.keys(charactersByLetter).sort();

    let currentLetter = letters[0];

    function showCharactersForLetter(letter) {
        characterItems.forEach(item => {
            item.style.display = 'none';
        });

        const itemsToShow = charactersByLetter[letter];
        if (itemsToShow) {
            itemsToShow.forEach(item => {
                item.style.display = 'block';
            });
        }

        updatePaginationButtons(letter);
    }


    function createPaginationButtons() {
        letters.forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => showCharactersForLetter(letter));
            paginationContainer.appendChild(button);
        });
    }

    function updatePaginationButtons(activeLetter) {
        const buttons = paginationContainer.querySelectorAll('button');
        buttons.forEach(button => {
            button.classList.toggle('active', button.textContent === activeLetter);
        });
    }

    createPaginationButtons();
    showCharactersForLetter(currentLetter);
});
