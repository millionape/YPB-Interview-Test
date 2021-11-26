const Url = require('../models/url')

exports.listURLs = async function (filter, callback) {
    var query = {}
    if ('code' in filter) {
        query.urlCode = {
            $regex: filter.code
        }
    }
    if ('keyword' in filter) {
        query.longURL = {
            $regex: filter.keyword
        }
    }
    try {
        const urls = await Url.find(query).select("-_id urlCode longURL exp hits")
        if (urls) {
            callback(null, urls)
        } else {
            callback('not found')
        }
    }
    // exception handler
    catch (err) {
        console.error(err)
        callback('Server Error')
    }
}

exports.findURL = async function (urlCode, callback) {
    try {
        const url = await Url.findOne({
            urlCode
        }).select("-_id urlCode longURL exp hits")
        if (url) {
            callback(null, url)
        } else {
            callback('not found')
        }
    }
    // exception handler
    catch (err) {
        console.error(err)
        callback('Server Error')
    }
}

exports.deleteURL = async function (urlCode, callback) {
    try {
        const urls = await Url.findOneAndUpdate({
            urlCode
        }, {
            enable: false
        })
        if (urls) {
            callback(null, "ok")
        } else {
            callback('not found')
        }
    }
    // exception handler
    catch (err) {
        console.error(err)
        callback('Server Error')
    }
}