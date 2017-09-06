var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid resource request ' + resource
    });

    return;
  }

  controller.find(req.query, (err, results) => {
    if (err) {
      res.json({ confirmation: 'fail', message: err });
      return;
    }
    res.json({ confirmation: 'success', results });
  });
});

router.get('/:resource/:id', (req, res, next) => {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid resource request ' + resource
    });

    return;
  }

  controller.findById(id, (err, result) => {
    if (err) {
      res.json({ confirmation: 'fail', message: 'Not found' });
      return;
    }
    res.json({ confirmation: 'success', result });
  });
});

router.post('/:resource', (req, res, next) => {
  var resource = req.params.resource;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid resource request ' + resource
    });

    return;
  }

  controller.create(req.body, (err, result) => {
    if (err) {
      res.json({ confirmation: 'fail', message: 'Not found' });
      return;
    }
    res.json({ confirmation: 'success', result });
  });
});

router.put('/:resource/:id', (req, res, next) => {
  var id = req.params.id;
  var resource = req.params.resource;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid resource request ' + resource
    });

    return;
  }

  controller.update(id, req.body, (err, result) => {
    if (err) {
      res.json({
        confirmation: 'fail',
        message: err
      });
    }

    res.json({
      confirmation: 'success',
      result
    });
  });
});

module.exports = router;
