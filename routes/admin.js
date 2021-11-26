var express = require('express');
var router = express.Router();

const {
    listURLs,
    deleteURL,
    findURL
} = require('../controllers/admin')

router.get('/url', function (req, res, next) {
    let quries = req.query
    var filter = {};
    if(quries.shortCode){
        filter.code = quries.shortCode
    }
    if(quries.keyword){
        filter.keyword = quries.keyword
    }
    listURLs(filter,function (err, result) {
        if (err) {
            console.error(err)
            res.status(502).json()
        } else {
            res.status(200).json(result)
        }
    })
});

router.get('/url/:code', function (req, res, next) {
    let params = req.params
    if (params.code) {
        findURL(params.code, function (err, result) {
            if (err) {
                console.error(err)
                res.status(502).json()
            } else {
                res.status(200).json(result)
            }
        })
    } else {
        res.status(400).json()
    }
});

router.delete('/url/:code', function (req, res, next) {
    let params = req.params
    if (params.code) {
        deleteURL(params.code, function (err, result) {
            if (err) {
                console.error(err)
                res.status(502).json()
            } else {
                res.status(200).json(result)
            }
        })
    }else{
        res.status(400).json()
    }
});

module.exports = router;