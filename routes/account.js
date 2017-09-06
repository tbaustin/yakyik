var express = require('express');
var router = express.Router();
var AccountController = require('../controllers/AccountController');

router.get('/:action', function(req, res, next) {
  var action = req.params.action;
  if (action == 'logout') {
    console.log('logged out');
    req.session.reset();

    res.json({
      confirmation: 'success',
      message: 'Sorry to see you go =('
    });

    return;
  }

  if (action == 'currentuser') {
    AccountController.currentUser(req)
      .then(result => {
        res.json({
          confirmation: 'success',
          user: result
        });
      })
      .catch(err => {
        res.json({
          confirmation: 'fail',
          message: err.message
        });
      });
  }
});

router.post('/:action', (req, res, next) => {
  var action = req.params.action;
  if (action == 'register') {
    AccountController.register(req)
      .then(result => {
        res.json({
          confirmation: 'success',
          user: result
        });
      })
      .catch(err => {
        res.json({
          confirmation: 'fail',
          message: err.message
        });
      });
  }

  if (action == 'login') {
    AccountController.login(req)
      .then(result => {
        res.json({
          confirmation: 'success',
          user: result
        });
      })
      .catch(err => {
        res.json({
          confirmation: 'fail',
          message: err.message
        });
      });
  }
});

module.exports = router;
