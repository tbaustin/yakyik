var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createzone', (req, res, next) => {
  res.render('createzone');
});

router.get('/createcomment', (req, res, next) => {
  res.render('createcomment');
});

module.exports = router;
