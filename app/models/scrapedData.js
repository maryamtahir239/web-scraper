const mongoose = require('mongoose');

const scrapedDataSchema = new mongoose.Schema({
  url: String,
  data: Object,
  interactions: [
    {
      action: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const ScrapedData = mongoose.model('ScrapedData', scrapedDataSchema);

module.exports = ScrapedData;