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

      // Validate the scraped data
      if (!Array.isArray(data)) {
        throw new Error('Invalid scraped data');
      }

      // Render the scraped data
      const html = data.map((item) => `<p>${item}</p>`).join('');
      scrapedDataDiv.innerHTML = html;
    } catch (error) {
      console.error(error);
      // Display an error message to the user
      scrapedDataDiv.textContent = 'Error: ' + error.message;
    }
  }
});