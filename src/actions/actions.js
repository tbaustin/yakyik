import constants from '../constants/constants';
import { APIManager } from '../utils';

export default {
  fetchProfile: params => {
    return dispatch => {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: 'loading',
        reducer: 'profile'
      });

      APIManager.get('/api/profile', params, (err, response) => {
        if (err) {
          alert(`ERROR: ${err.message}`);
          return;
        }

        if (response.results.length == 0) {
          alert('Profile Not Found.');
          return;
        }

        const profile = response.results[0];

        dispatch({
          type: constants.PROFILE_RECEIVED,
          profile: profile,
          status: 'ready'
        });
      });
    };
  },

  commentsReceived: (comments, zone) => {
    return {
      type: constants.COMMENTS_RECEIVED,
      comments: comments,
      zone: zone
    };
  },

  updateComment: (comment, params) => {
    return dispatch => {
      const endpoint = `/api/comment/${comment._id}`;
      APIManager.put(endpoint, params, (err, response) => {
        if (err) {
          alert('updatedComment', err);
          return;
        }

        const updatedComment = response.result;
        dispatch({
          type: constants.COMMENT_UPDATED,
          comment: updatedComment
        });
      });
    };
  },

  commentCreated: comment => {
    return {
      type: constants.COMMENT_CREATED,
      comment: comment
    };
  },

  fetchZones: params => {
    return dispatch => {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: 'loading',
        reducer: 'zone'
      });

      APIManager.get('/api/zone', params, (err, response) => {
        if (err) {
          alert(`ERROR apimanagergetzone: ${err.message}`);
          return;
        }

        const zones = response.results;
        dispatch({
          type: constants.ZONES_RECEIVED,
          zones: zones
        });
      });
    };
  },

  zoneCreated: zone => {
    return {
      type: constants.ZONE_CREATED,
      zone: zone
    };
  },

  selectZone: zoneIndex => {
    return {
      type: constants.SELECT_ZONE,
      selectedZone: zoneIndex
    };
  },

  currentUserReceived: user => {
    return {
      type: constants.CURRENT_USER_RECEIVED,
      user: user
    };
  },

  fetchCurrentUser: () => {
    return dispatch => {
      APIManager.get('/account/currentuser', null, (err, response) => {
        if (err) {
          // not logged in, ingore error
          // alert(`ERROR: ${err.message}`);
          return;
        }
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: response.user
        });
      });
    };
  },

  updateProfile: (profile, updated) => {
    return dispatch => {
      APIManager.put(
        `/api/profile/${profile._id}`,
        updated,
        (err, response) => {
          if (err) {
            alert(`ERROR updateprofileput: ${err.message}`);
            return;
          }

          const updatedProfile = response.result;
          dispatch({
            type: constants.PROFILE_UPDATED,
            profile: updatedProfile
          });
        }
      );
    };
  }
};
