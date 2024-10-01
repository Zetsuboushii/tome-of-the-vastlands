document.addEventListener("DOMContentLoaded", function () {
    const longTextDivs = document.querySelectorAll('.long-text');

    longTextDivs.forEach((div) => {
        const headings = div.querySelectorAll('h1, h2, h3, h4, h5, h6');

        headings.forEach((heading) => {
            const hr = document.createElement('hr');
            heading.parentNode.insertBefore(hr, heading.nextSibling);
        });
    });

    const headings = document.querySelectorAll('.long-text h1, .long-text h2, .long-text h3, .long-text h4, .long-text h5, .long-text h6');

    headings.forEach((heading, index) => {
        let id = heading.textContent.trim().toLowerCase().replace(/[\s\W-]+/g, '-');
        if (document.getElementById(id)) {
            id = `${id}`;
        }

        heading.id = id;

        const anchorLink = document.createElement('a');
        anchorLink.href = `#${id}`;
        anchorLink.innerHTML = '🔗';
        anchorLink.className = 'anchor-link';
        anchorLink.style.marginLeft = '10px';
        anchorLink.style.fontSize = '20px';

        // Füge den Anker-Link zur Überschrift hinzu
        heading.appendChild(anchorLink);
    });
});
