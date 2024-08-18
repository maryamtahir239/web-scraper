const express = require('express');
const app = express();
const puppeteer = require('./utils/puppeteer');
const ScrapedData = require('./models/scrapedData');

app.use(express.json());

app.post('/scrape', async (req, res) => {
    const { url } = req.body;
    try {
        const data = await puppeteer.scrape(url);
        const scrapedData = new ScrapedData({ url, data });
        await scrapedData.save();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to scrape URL' });
    }
});

app.post('/interact', async (req, res) => {
    const { url, action } = req.body;
    try {
        await puppeteer.interact(url, action);
        res.json({ message: 'Interaction successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to interact with URL' });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});