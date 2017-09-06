"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
  map: {}
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updatedState = Object.assign({}, state);
  var updatedMap = Object.assign({}, updatedState.map);

  switch (action.type) {
    case constants.COMMENTS_RECEIVED:
      var zoneComments = updatedMap[action.zone._id] ? Object.assign([], updatedMap[action.zone._id]) //old way of copying Obj/Arr
      : [];

      action.comments.map(function (comment, i) {
        zoneComments.push(comment);
      });

      updatedMap[action.zone._id] = zoneComments;
      updatedState.map = updatedMap;

      return updatedState;

    case constants.COMMENT_CREATED:
      var zoneComment = updatedMap[action.comment.zone] ? [].concat(_toConsumableArray(updatedMap[action.comment.zone])) //new way of copying Obj/Arr
      : [];
      // let ZoneComment = updatedMap[action.comment.zone]
      //   ? Object.assign([], updatedMap[action.comment.zone])
      //   : [];
      zoneComment.push(action.comment);
      updatedMap[action.comment.zone] = zoneComment;
      updatedState.map = updatedMap;

      return updatedState;

    case constants.COMMENT_UPDATED:
      var list = updatedMap[action.comment.zone] ? [].concat(_toConsumableArray(updatedMap[action.comment.zone])) : [];

      var newList = [];

      list.forEach(function (comment, i) {
        if (comment._id == action.comment._id) {
          newList.push(action.comment);
        } else {
          newList.push(comment);
        }
      });

      updatedMap[action.comment.zone] = newList;
      updatedState.map = updatedMap;

      return updatedState;

    case constants.SELECT_ZONE:
      return updatedState;

    default:
      return state;
  }
};