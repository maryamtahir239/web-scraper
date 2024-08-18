const express = require('express');
const router = express.Router();
const puppeteer = require('../utils/puppeteer');

router.post('/', async (req, res) => {
  const { url } = req.body;
  try {
    const data = await puppeteer.scrape(url);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape URL' });
  }
});

module.exports = router;