var express = require('express');
var router = express.Router();
const {
  getLongURL
} = require('../controllers/url')
const moment = require('moment')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({msg: "Hello"})
});

router.get('/:code', async function (req, res, next) {
  let params = req.params;
  if(params.code){
      getLongURL(params.code, function(err, result){
          if (err) {
              console.error(err)
              res.status(502).json(err)
          } else {
            if(!result.enable){
              res.status(410).json('not found')
              return
            }
            const isSameOrAfter = moment(result.exp).isSameOrAfter(moment())
            if(!isSameOrAfter && result.exp !== 0){
              console.log("this url is expired")
              res.status(410).json('expired')
              return
            }
            res.status(302).redirect(result.longURL)
          }
      })
  }else{
      res.status(404).json("not found")
  }
});

module.exports = router;
