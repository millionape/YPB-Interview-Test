const mongoose = require('mongoose')

// instantiate a mongoose schema
const URLSchema = new mongoose.Schema({
    urlCode: String,
    longURL: String,
    shortURL: String,
    enable: Boolean,
    hits: Number,
    exp: Number,
    date: {
        type: String,
        default: Date.now
    }
})

// create a model from schema and export it
module.exports = mongoose.model('Url', URLSchema)