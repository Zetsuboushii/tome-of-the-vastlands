document.addEventListener("DOMContentLoaded", function () {
    const characterItems = document.querySelectorAll('.character-item');
    const paginationContainer = document.getElementById('pagination');

    function getFirstLetter(item) {
        return item.textContent.trim().charAt(0).toUpperCase();
    }

    function getHomeAttribute(item) {
        return item.getAttribute('data-home') || 'Unknown';
    }

    const charactersByLetter = {};
    const charactersByHome = {};

    characterItems.forEach(item => {
        const firstLetter = getFirstLetter(item);
        if (!charactersByLetter[firstLetter]) {
            charactersByLetter[firstLetter] = [];
        }
        charactersByLetter[firstLetter].push(item);

        const home = getHomeAttribute(item);
        if (!charactersByHome[home]) {
            charactersByHome[home] = [];
        }
        charactersByHome[home].push(item);

        const img = item.querySelector('img');
        if (img) {
            img.dataset.src = img.src;
            img.removeAttribute('src');
        }
    });

    const letters = Object.keys(charactersByLetter).sort();
    const homes = Object.keys(charactersByHome).sort();

    function showCharactersForGroup(group, groupType) {
        characterItems.forEach(item => {
            item.style.display = 'none';
        });

        const itemsToShow = groupType === 'letter' ? charactersByLetter[group] : charactersByHome[group];
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

        updatePaginationButtons(group, groupType);
        updateURL(group, groupType);
    }

    function createPaginationButtons(groupType) {
        paginationContainer.innerHTML = '';
        const groups = groupType === 'letter' ? letters : homes;

        groups.forEach(group => {
            const button = document.createElement('button');
            button.textContent = group;
            button.classList.add("button-" + groupType);
            button.addEventListener('click', () => showCharactersForGroup(group, groupType));
            paginationContainer.appendChild(button);
        });
    }

    function updatePaginationButtons(activeGroup, groupType) {
        const buttons = paginationContainer.querySelectorAll('button');
        buttons.forEach(button => {
            button.classList.toggle('active', button.textContent === activeGroup);
        });
    }

    function updateURL(group, groupType) {
        const url = new URL(window.location);
        url.searchParams.set(groupType, group);
        window.history.pushState({}, '', url);
    }

    function getGroupFromURL(groupType) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(groupType) || (groupType === 'letter' ? letters[0] : homes[0]);
    }

    const groupToggle = document.createElement('div');
    groupToggle.style.textAlign = 'center';
    groupToggle.style.marginBottom = '10px';

    const letterButton = document.createElement('button');
    letterButton.textContent = 'By Letter';
    letterButton.classList.add("select-group-button");
    letterButton.addEventListener('click', () => {
        createPaginationButtons('letter');
        const currentLetter = getGroupFromURL('letter');
        showCharactersForGroup(currentLetter, 'letter');
    });

    const homeButton = document.createElement('button');
    homeButton.textContent = 'By Home';
    homeButton.classList.add("select-group-button");
    homeButton.addEventListener('click', () => {
        createPaginationButtons('home');
        const currentHome = getGroupFromURL('home');
        showCharactersForGroup(currentHome, 'home');
    });

    groupToggle.appendChild(letterButton);
    groupToggle.appendChild(homeButton);

    paginationContainer.parentNode.insertBefore(groupToggle, paginationContainer);

    createPaginationButtons('letter');

    const currentLetter = getGroupFromURL('letter');
    showCharactersForGroup(currentLetter, 'letter');

    window.addEventListener('popstate', () => {
        const groupType = window.location.search.includes('home') ? 'home' : 'letter';
        const group = getGroupFromURL(groupType);
        showCharactersForGroup(group, groupType);
    });
});
