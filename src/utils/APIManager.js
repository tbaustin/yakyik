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
  put: (url, id, parmas, callback) => {},
  delete: (url, id, callback) => {}
};
