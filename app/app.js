const express = require('express');
const app = express();
const config = require('./config');
const mongoose = require('mongoose');
const PuppeteerScrapper = require('./utils/puppeteer');
const scrapedData = require('./models/scrapedData');

// Connect to MongoDB using Mongoose
mongoose.connect(config.mongoose.url, config.mongoose.options);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const puppeteerScrapper = new PuppeteerScrapper();

app.use(express.json());
app.use(express.static('client'));

app.post('/scrape', async (req, res) => {
  const { url } = req.body;
  try {
    const data = await puppeteerScrapper.scrape(url);
    const ScrapedData = new scrapedData({ url, data });
    await ScrapedData.save();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape URL' });
  }
});

app.post('/interact', async (req, res) => {
  const { url, action } = req.body;
  try {
    await puppeteerScrapper.interact(url, action);
    res.json({ message: 'Interaction successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to interact with URL' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});