"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var APIManager = require("../utils").APIManager;
module.exports = {
  fetchProfile: function (params) {
    return function (dispatch) {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: "loading",
        reducer: "profile"
      });

      APIManager.get("/api/profile", params, function (err, response) {
        if (err) {
          alert("ERROR: " + err.message);
          return;
        }

        if (response.results.length == 0) {
          alert("Profile Not Found.");
          return;
        }

        var profile = response.results[0];

        dispatch({
          type: constants.PROFILE_RECEIVED,
          profile: profile,
          status: "ready"
        });
      });
    };
  },

  commentsReceived: function (comments, zone) {
    return {
      type: constants.COMMENTS_RECEIVED,
      comments: comments,
      zone: zone
    };
  },

  updateComment: function (comment, params) {
    return function (dispatch) {
      var endpoint = "/api/comment/" + comment._id;
      APIManager.put(endpoint, params, function (err, response) {
        if (err) {
          alert("updatedComment", err);
          return;
        }

        var updatedComment = response.result;
        dispatch({
          type: constants.COMMENT_UPDATED,
          comment: updatedComment
        });
      });
    };
  },

  commentCreated: function (comment) {
    return {
      type: constants.COMMENT_CREATED,
      comment: comment
    };
  },

  fetchZones: function (params) {
    return function (dispatch) {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: "loading",
        reducer: "zone"
      });

      APIManager.get("/api/zone", params, function (err, response) {
        if (err) {
          alert("ERROR apimanagergetzone: " + err.message);
          return;
        }

        var zones = response.results;
        dispatch({
          type: constants.ZONES_RECEIVED,
          zones: zones
        });
      });
    };
  },

  zoneCreated: function (zone) {
    return {
      type: constants.ZONE_CREATED,
      zone: zone
    };
  },

  selectZone: function (zoneIndex) {
    return {
      type: constants.SELECT_ZONE,
      selectedZone: zoneIndex
    };
  },

  currentUserReceived: function (user) {
    return {
      type: constants.CURRENT_USER_RECEIVED,
      user: user
    };
  },

  fetchCurrentUser: function () {
    return function (dispatch) {
      APIManager.get("/account/currentuser", null, function (err, response) {
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

  updateProfile: function (profile, updated) {
    return function (dispatch) {
      APIManager.put("/api/profile/" + profile._id, updated, function (err, response) {
        if (err) {
          alert("ERROR updateprofileput: " + err.message);
          return;
        }

        var updatedProfile = response.result;
        dispatch({
          type: constants.PROFILE_UPDATED,
          profile: updatedProfile
        });
      });
    };
  }
};