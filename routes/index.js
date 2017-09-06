var express = require('express');
var router = express.Router();
var requestHandler = require('../requestHandler');
var controllers = require('../controllers');

router.get('/', function(req, res, next) {
  requestHandler(req, res);
});

router.get('/:page/:slug', function(req, res, next) {
  const { page, slug } = req.params;

  if (page == 'api') {
    next();
    return;
  }
  requestHandler(req, res);
});

module.exports = router;
