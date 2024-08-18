const express = require('express');
const router = express.Router();
const puppeteer = require('./utils/puppeteer');

router.post('/', async (req, res) => {
  const { url, action, selector } = req.body;
  try {
    await puppeteer.interact(url, action, selector);
    res.json({ message: 'Interaction successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to interact with URL' });
  }
});

module.exports = router;