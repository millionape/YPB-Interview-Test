var express = require('express');
var router = express.Router();
const {
    generateShortUrl
} = require('../controllers/url')

router.post('/', function (req, res, next) {
    const {
        longURL,
        exp
    } = req.body
    if (longURL) {
        generateShortUrl(longURL, exp, function (err, result) {
            if (err) {
                console.error(err)
                res.status(502).json()
            } else {
                res.status(200).json({
                    shortURL: result
                })
            }
        })
    } else {
        res.status(400).json()
    }
});

module.exports = router;