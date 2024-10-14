document.addEventListener("DOMContentLoaded", function () {
    const characterItems = document.querySelectorAll('.character-item');
    const paginationContainer = document.getElementById('pagination');

    function getFirstLetter(item) {
        return item.textContent.trim().charAt(0).toUpperCase();
    }

    const charactersByLetter = {};
    characterItems.forEach(item => {
        const firstLetter = getFirstLetter(item);
        if (!charactersByLetter[firstLetter]) {
            charactersByLetter[firstLetter] = [];
        }
        charactersByLetter[firstLetter].push(item);

        const img = item.querySelector('img');
        if (img) {
            img.dataset.src = img.src;
            img.removeAttribute('src');
        }
    });

    const letters = Object.keys(charactersByLetter).sort();

    function showCharactersForLetter(letter) {
        characterItems.forEach(item => {
            item.style.display = 'none';
        });

        const itemsToShow = charactersByLetter[letter];
        if (itemsToShow) {
            itemsToShow.forEach(item => {
                item.style.display = 'block';

                const img = item.querySelector('img');
                if (img && !img.src) {
                    img.src = img.dataset.src;
                    img.setAttribute('loading', 'lazy');
                }
            });
        }

        updatePaginationButtons(letter);
        updateURL(letter);
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

    function updateURL(letter) {
        const url = new URL(window.location);
        url.searchParams.set('letter', letter);
        window.history.pushState({}, '', url);
    }

    function getLetterFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('letter') || letters[0];
    }

    createPaginationButtons();

    const currentLetter = getLetterFromURL();
    showCharactersForLetter(currentLetter);

    window.addEventListener('popstate', () => {
        const letter = getLetterFromURL();
        showCharactersForLetter(letter);
    });
});
