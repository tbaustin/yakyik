var Promise = require('bluebird');
var bcrypt = require('bcryptjs');

var ProfileController = require('./ProfileController');

module.exports = {
  currentUser: function(req) {
    return new Promise((resolve, reject) => {
      if (req.session == null) {
        resolve(null);
        return;
      }

      if (req.session.user == null) {
        resolve(null);
        return;
      }
      ProfileController.findById(req.session.user, function(err, result) {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  },
  register: function(req) {
    return new Promise((resolve, reject) => {
      ProfileController.create(req.body, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        req.session.user = result._id;

        resolve(result);
      });
    });
  },
  login: function(req) {
    return new Promise((resolve, reject) => {
      var params = { username: req.body.username };
      ProfileController.find(params, (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        if (results.length == 0) {
          reject({ message: 'Username does not exist. Check your spelling' });
          return;
        }

        var profile = results[0];
        var isPasswordCorrect = bcrypt.compareSync(
          req.body.password,
          profile.password
        );
        if (isPasswordCorrect == false) {
          reject({ message: 'Incorrect password. Check your spelling' });
          return;
        }

        req.session.user = profile._id;

        resolve(profile);
      });
    });
  }
};
