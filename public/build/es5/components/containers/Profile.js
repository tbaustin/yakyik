"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var ImageHelper = require("../../utils").ImageHelper;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var Profile = (function (Component) {
  function Profile() {
    _classCallCheck(this, Profile);

    _get(Object.getPrototypeOf(Profile.prototype), "constructor", this).call(this);
  }

  _inherits(Profile, Component);

  _prototypeProperties(Profile, null, {
    componentDidMount: {
      value: function componentDidMount() {
        var profiles = this.props.profiles;


        var profile = profiles[this.props.username];
        if (profile != null) {
          return;
        }this.props.fetchProfile({ username: this.props.username });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var profiles = this.props.profiles;
        var profile = profiles[this.props.username];

        var header = null;
        if (profile != null) {
          header = React.createElement(
            "div",
            null,
            React.createElement(
              "h3",
              null,
              profile.username
            ),
            React.createElement(
              "div",
              null,
              React.createElement("img", { src: ImageHelper.thumbnail(profile.image, 150) })
            ),
            React.createElement(
              "p",
              null,
              "city: ",
              profile.city
            ),
            React.createElement(
              "p",
              null,
              "gender: ",
              profile.gender
            ),
            React.createElement(
              "p",
              null,
              "biography: ",
              profile.biography
            )
          );
        }

        var content = this.props.appStatus == "loading" ? "Loading..." : header;

        return React.createElement(
          "div",
          null,
          content
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Profile;
})(Component);

var stateToProps = function (state) {
  return {
    profiles: state.profile.map,
    appStatus: state.profile.appStatus
  };
};

var dispatchToProps = function (dispatch) {
  return {
    fetchProfile: function (params) {
      return dispatch(actions.fetchProfile(params));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(Profile);