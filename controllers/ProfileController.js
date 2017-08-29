var Profile = require('../models/Profile');
var bcrypt = require('bcryptjs');

module.exports = {
  find: (params, callback) => {
    Profile.find(params, (err, profiles) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, profiles);
    });
  },
  findById: (id, callback) => {
    Profile.findById(id, (err, profile) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, profile);
    });
  },
  create: (params, callback) => {
    params['password'] = bcrypt.hashSync(params.password, 10);
    Profile.create(params, (err, profile) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, profile);
    });
  },
  update: (id, params, callback) => {
    Profile.findByIdAndUpdate(id, params, { new: true }, (err, profile) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, profile);
    });
  },
  delete: (id, callback) => {
    Profile.findByIdAndRemove(id, err => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, null);
    });
  }
};
