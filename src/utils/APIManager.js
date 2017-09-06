import axios from 'axios';

export default {
  get: (url, params, callback) => {
    axios
      .get(url, { params })
      .then(response => {
        const { data } = response;
        if (data.confirmation != 'success') {
          callback({ message: data.message }, null);
          return;
        }

        callback(null, data);
      })
      .catch(err => {
        callback(err, null);
      });
  },
  post: (url, body, callback) => {
    axios
      .post(url, body)
      .then(response => {
        const { data } = response;
        if (data.confirmation != 'success') {
          callback({ message: data.message }, null);
          return;
        }

        callback(null, data);
      })
      .catch(err => {
        callback(err, null);
      });
  },
  put: (url, body, callback) => {
    axios
      .put(url, body)
      .then(response => {
        const { data } = response;
        if (data.confirmation != 'success') {
          callback({ message: data.message }, null);
          return;
        }

        callback(null, data);
      })
      .catch(err => {
        callback(err, null);
      });
  },
  delete: (url, id, callback) => {},

  upload: (endpoint, file, params, callback, callbackProgress) => {
    let fd = new FormData();

    fd.append('file', file);
    Object.keys(params).forEach(key => {
      fd.append(key, params[key]);
    });

    const config = {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      onUploadProgress: progressEvent => {
        const progress = Math.round(
          progressEvent.loaded * 100.0 / progressEvent.total
        );

        callbackProgress(progress);
      }
    };

    axios
      .post(endpoint, fd, config)
      .then(response => {
        const { data } = response;
        callback(null, data);
      })
      .catch(err => {
        callback(err, null);
      });
  }
};
