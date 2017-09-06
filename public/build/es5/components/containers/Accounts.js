"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _utils = require("../../utils");

var APIManager = _utils.APIManager;
var ImageHelper = _utils.ImageHelper;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var Link = require("react-router-dom").Link;
var axios = _interopRequire(require("axios"));

var Accounts = (function (Component) {
  function Accounts() {
    _classCallCheck(this, Accounts);

    _get(Object.getPrototypeOf(Accounts.prototype), "constructor", this).call(this);

    this.state = {
      profile: {
        username: "",
        password: "",
        city: "",
        gender: ""
      }
    };
  }

  _inherits(Accounts, Component);

  _prototypeProperties(Accounts, null, {
    componentDidMount: {
      value: function componentDidMount() {
        this.props.fetchCurrentUser();
      },
      writable: true,
      configurable: true
    },
    updateProfile: {
      value: function updateProfile(event) {
        event.preventDefault();

        var updatedProfile = Object.assign({}, this.state.profile);
        updatedProfile[event.target.id] = event.target.value;

        this.setState({
          profile: updatedProfile
        });
      },
      writable: true,
      configurable: true
    },
    logout: {
      value: function logout(event) {
        var _this = this;
        event.preventDefault();

        APIManager.get("/account/logout", null, function (err, response) {
          if (err) {
            alert("ERROR: " + err.message);
            return;
          }
          _this.props.currentUserReceived(null);
          alert(response.message);
        });
      },
      writable: true,
      configurable: true
    },
    login: {
      value: function login(event) {
        var _this = this;
        event.preventDefault();
        if (this.state.profile.username.length == 0) {
          alert("Please enter your username");
          return;
        }

        if (this.state.profile.password.length == 0) {
          alert("Please enter your password");
          return;
        }
        APIManager.post("/account/login", this.state.profile, function (err, response) {
          if (err) {
            alert("ERROR: " + err.message);
            return;
          }

          _this.props.currentUserReceived(response.user);
        });
      },
      writable: true,
      configurable: true
    },
    signup: {
      value: function signup(event) {
        var _this = this;
        event.preventDefault();
        if (this.state.profile.username.length == 0) {
          alert("Please enter your username");
          return;
        }

        if (this.state.profile.password.length == 0) {
          alert("Please enter your password");
          return;
        }

        APIManager.post("/account/register", this.state.profile, function (err, response) {
          if (err) {
            alert("ERROR: " + err.message);
            return;
          }

          _this.props.currentUserReceived(response.user);
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var content = null;
        // console.log(this.props.user);
        if (this.props.user == null) {
          content = React.createElement(
            "div",
            null,
            React.createElement(
              "h2",
              null,
              "Login"
            ),
            React.createElement("input", {
              id: "username",
              onChange: this.updateProfile.bind(this),
              type: "text",
              placeholder: "username"
            }),
            React.createElement("br", null),
            React.createElement("input", {
              id: "password",
              onChange: this.updateProfile.bind(this),
              type: "password",
              placeholder: "password"
            }),
            React.createElement("br", null),
            React.createElement(
              "button",
              { onClick: this.login.bind(this) },
              "Log In"
            ),
            React.createElement(
              "h2",
              null,
              "Sign Up"
            ),
            React.createElement("input", {
              id: "username",
              onChange: this.updateProfile.bind(this),
              type: "text",
              placeholder: "username"
            }),
            React.createElement("br", null),
            React.createElement("input", {
              id: "password",
              onChange: this.updateProfile.bind(this),
              type: "password",
              placeholder: "password"
            }),
            React.createElement("br", null),
            React.createElement("input", {
              id: "city",
              onChange: this.updateProfile.bind(this),
              type: "text",
              placeholder: "City"
            }),
            React.createElement("br", null),
            React.createElement("input", {
              id: "gender",
              onChange: this.updateProfile.bind(this),
              type: "text",
              placeholder: "Gender"
            }),
            React.createElement("textarea", {
              id: "biography",
              className: "form-control",
              onChange: this.updateProfile.bind(this),
              defaultValue: "Write your biography here!!",
              rows: "4",
              cols: "50"
            }),
            React.createElement("br", null),
            React.createElement(
              "button",
              { onClick: this.signup.bind(this) },
              "Join"
            )
          );
        } else {
          content = React.createElement(
            "div",
            null,
            React.createElement(
              Link,
              { to: "/currentuser" },
              React.createElement("img", {
                className: "account__thumbnail-image",
                src: ImageHelper.thumbnail(this.props.user.image, 72)
              })
            ),
            React.createElement(
              "h2",
              null,
              "Welcome ",
              this.props.user.username
            ),
            React.createElement(
              "span",
              null,
              this.props.user.city
            ),
            React.createElement("br", null),
            React.createElement(
              "button",
              { onClick: this.logout.bind(this) },
              "Log Out"
            ),
            React.createElement(
              Link,
              { to: "/currentuser" },
              React.createElement(
                "button",
                null,
                "Account"
              )
            )
          );
        }
        return content;
      },
      writable: true,
      configurable: true
    }
  });

  return Accounts;
})(Component);

var stateToProps = function (state) {
  return {
    user: state.account.user
  };
};

var dispatchToProps = function (dispatch) {
  return {
    fetchCurrentUser: function () {
      return dispatch(actions.fetchCurrentUser());
    },
    currentUserReceived: function (user) {
      return dispatch(actions.currentUserReceived(user));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(Accounts);