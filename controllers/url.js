const validUrl = require('valid-url')
const shortid = require('shortid')
const {
    conf
} = require('../config/config')
const Url = require('../models/url')
const moment = require('moment')

exports.generateShortUrl = async function (longURL, expired, callback) {
    const urlCode = shortid.generate()
    const baseURL = conf.BASE_URL;
    if (validUrl.isUri(longURL)) {
        // find exist url
        let url = await Url.findOneAndUpdate({
            longURL
        },{enable : true})
        if (url) {
            callback(null, url.shortURL)
        } else {
            const shortURL = baseURL + '/' + urlCode
            url = new Url({
                longURL,
                shortURL,
                urlCode,
                enable: true,
                hits: 0,
                exp: expired === undefined ? 0 : Number(moment(expired, 'YYYY-MM-DD HH:mm:ss').valueOf()),
                date: new Date()
            })
            await url.save()
            callback(null, shortURL)
        }
    }
    callback("not a valid URL")
};

exports.getLongURL = async function (urlCode, callback) {
    try {
        const url = await Url.findOneAndUpdate({
            urlCode
        },{$inc : {'hits' : 1}})
        if (url) {
            callback(null, url)
        } else {
            callback('No URL Found')
        }
    }
    // exception handler
    catch (err) {
        console.error(err)
        callback('Server Error')
    }
}