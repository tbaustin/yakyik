"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
  list: [],
  map: {},
  appStatus: "ready"
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updatedState = Object.assign({}, state);
  var updatedList = Object.assign([], updatedState.list);
  var updatedMap = Object.assign({}, updatedState.map);

  switch (action.type) {
    case constants.PROFILE_RECEIVED:
      updatedList = [action.profile];
      updatedState.list = updatedList;

      updatedMap[action.profile.username] = action.profile;
      updatedState.map = updatedMap;

      updatedState.appStatus = action.status;

      return updatedState;

    case constants.APPLICATION_STATE:
      if (action.reducer != "profile") {
        return updatedState;
      }
      updatedState.appStatus = action.status;
      return updatedState;

    default:
      return state;
  }
};