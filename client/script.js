const urlForm = document.getElementById('url-form');
const scrapeBtn = document.getElementById('scrape-btn');
const scrapedDataDiv = document.getElementById('scraped-data');

urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const urlInput = document.getElementById('url-input');
    const url = urlInput.value.trim();
    if (url) {
        try {
            const response = await fetch('/scrape', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });
            const data = await response.json();
            scrapedDataDiv.innerHTML = '';
            data.forEach((item) => {
                const paragraph = document.createElement('p');
                paragraph.textContent = item;
                scrapedDataDiv.appendChild(paragraph);
            });
        } catch (error) {
            console.error(error);
        }
    }
});