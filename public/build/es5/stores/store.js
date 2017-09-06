"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _redux = require("redux");

var createStore = _redux.createStore;
var combineReducers = _redux.combineReducers;
var applyMiddleware = _redux.applyMiddleware;
var thunk = _interopRequire(require("redux-thunk"));

var _reducers = require("../reducers");

var accountReducer = _reducers.accountReducer;
var zoneReducer = _reducers.zoneReducer;
var commentReducer = _reducers.commentReducer;
var profileReducer = _reducers.profileReducer;


var store = undefined;

module.exports = {
  configureStore: function (initial) {
    var reducers = combineReducers({
      zone: zoneReducer,
      comment: commentReducer,
      account: accountReducer,
      profile: profileReducer
    });

    store = createStore(reducers, initial, applyMiddleware(thunk));

    return store;
  },

  currentStore: function () {
    return store;
  }
};