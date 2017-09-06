"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var axios = _interopRequire(require("axios"));

module.exports = {
  get: function (url, params, callback) {
    axios.get(url, { params: params }).then(function (response) {
      var data = response.data;
      if (data.confirmation != "success") {
        callback({ message: data.message }, null);
        return;
      }

      callback(null, data);
    })["catch"](function (err) {
      callback(err, null);
    });
  },
  post: function (url, body, callback) {
    axios.post(url, body).then(function (response) {
      var data = response.data;
      if (data.confirmation != "success") {
        callback({ message: data.message }, null);
        return;
      }

      callback(null, data);
    })["catch"](function (err) {
      callback(err, null);
    });
  },
  put: function (url, body, callback) {
    axios.put(url, body).then(function (response) {
      var data = response.data;
      if (data.confirmation != "success") {
        callback({ message: data.message }, null);
        return;
      }

      callback(null, data);
    })["catch"](function (err) {
      callback(err, null);
    });
  },
  "delete": function (url, id, callback) {},

  upload: function (endpoint, file, params, callback, callbackProgress) {
    var fd = new FormData();

    fd.append("file", file);
    Object.keys(params).forEach(function (key) {
      fd.append(key, params[key]);
    });

    var config = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
      onUploadProgress: function (progressEvent) {
        var progress = Math.round(progressEvent.loaded * 100 / progressEvent.total);

        callbackProgress(progress);
      }
    };

    axios.post(endpoint, fd, config).then(function (response) {
      var data = response.data;
      callback(null, data);
    })["catch"](function (err) {
      callback(err, null);
    });
  }
};