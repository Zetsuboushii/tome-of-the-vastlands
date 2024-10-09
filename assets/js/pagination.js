document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 3; // Anzahl der Charaktere pro Seite
    const characterItems = document.querySelectorAll('.character-item'); // Alle Charakter-Elemente
    const totalItems = characterItems.length; // Gesamtanzahl der Charaktere
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Gesamtanzahl der Seiten
    const paginationContainer = document.getElementById('pagination'); // Container für die Navigation

    let currentPage = 1; // Startseite

    // Funktion zum Anzeigen der Elemente basierend auf der aktuellen Seite
    function showPage(page) {
        // Alle Elemente ausblenden
        characterItems.forEach((item, index) => {
            item.style.display = 'none';
        });

        // Berechne die Start- und Endindizes der Elemente für die aktuelle Seite
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // Nur die Elemente der aktuellen Seite anzeigen
        for (let i = start; i < end && i < totalItems; i++) {
            characterItems[i].style.display = 'block';
        }

        // Navigation aktualisieren
        updatePaginationButtons(page);
    }

    // Funktion zum Erstellen der Navigationsbuttons
    function createPaginationButtons() {
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', () => showPage(i)); // Event-Listener hinzufügen
            paginationContainer.appendChild(button);
        }
    }

    // Funktion zum Aktualisieren der aktiven Navigationsbuttons
    function updatePaginationButtons(page) {
        const buttons = paginationContainer.querySelectorAll('button');
        buttons.forEach((button, index) => {
            button.classList.toggle('active', index + 1 === page); // Aktiven Button hervorheben
        });
    }

    // Paginierung initialisieren
    createPaginationButtons();
    showPage(currentPage); // Zeige die erste Seite standardmäßig an
});