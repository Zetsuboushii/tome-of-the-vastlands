document.addEventListener("DOMContentLoaded", function () {
    // Wählt alle long-text Divs aus, die NICHT innerhalb von .use-container.mobile liegen
    const longTextDivs = document.querySelectorAll('.long-text:not(.use-container.mobile .long-text)');
    const toc = document.getElementById('toc-content');

    if (toc) {
        const ul = document.createElement('ul');

        longTextDivs.forEach(div => {
            const headings = div.querySelectorAll('h2, h3, h4');

            headings.forEach(heading => {
                let id = heading.textContent.trim().toLowerCase().replace(/[\s\W-]+/g, '-');
                heading.id = id;

                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `#${id}`;
                a.textContent = heading.textContent;

                li.appendChild(a);
                ul.appendChild(li);
            });
        });

        if (ul.childElementCount > 0) {
            toc.appendChild(ul);
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const toc = document.getElementById('toc');
    const toggleButton = document.getElementById('toc-toggle');

    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            toc.classList.toggle('collapsed');
        });
    }
});
