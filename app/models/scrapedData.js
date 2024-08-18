const mongoose = require('mongoose');

const scrapedDataSchema = new mongoose.Schema({
    url: String,
    data: Array,
});

const ScrapedData = mongoose.model('ScrapedData', scrapedDataSchema);

module.exports = ScrapedData;