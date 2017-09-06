"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var DropZone = _interopRequire(require("react-dropzone"));

var _utils = require("../../utils");

var APIManager = _utils.APIManager;
var ImageHelper = _utils.ImageHelper;
var sha1 = _interopRequire(require("sha1"));

var CurrentUser = (function (Component) {
  function CurrentUser() {
    _classCallCheck(this, CurrentUser);

    _get(Object.getPrototypeOf(CurrentUser.prototype), "constructor", this).call(this);

    this.state = {
      updated: {}
    };
  }

  _inherits(CurrentUser, Component);

  _prototypeProperties(CurrentUser, null, {
    componentDidMount: {
      value: function componentDidMount() {},
      writable: true,
      configurable: true
    },
    updateCurrentUser: {
      value: function updateCurrentUser(event) {
        event.preventDefault();

        var updatedProfile = Object.assign({}, this.state.updated);
        updatedProfile[event.target.id] = event.target.value;
        this.setState({
          updated: updatedProfile
        });
      },
      writable: true,
      configurable: true
    },
    submitProfile: {
      value: function submitProfile(event) {
        event.preventDefault();
        if (Object.values(this.state.updated).length == 0) {
          alert("No Changes Made!!");
          return;
        }
        //Prevents a user from typing and then deleting the value to submit an empty object
        var submitArray = [];
        //some is array method that will "break" or "stop" iteration as soon as a value is true
        Object.values(this.state.updated).some(function (item) {
          if (item != "") {
            submitArray.push(item);
            return submitArray;
          }
        });

        if (submitArray.length == 0) {
          alert("No Changes Made!!");
          return;
        }

        this.props.updateProfile(this.props.user, this.state.updated);
      },
      writable: true,
      configurable: true
    },
    uploadImage: {
      value: function uploadImage(files) {
        var _this = this;
        var image = files[0];

        var cloudName = "hyszj0vmt";
        var url = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";

        var apiSecret = "_lruNZ8yrruUqb9RDGYeVE23YcI";
        var uploadPreset = "rhmvjoqw";
        var timestamp = Date.now() / 1000;
        var paramStr = "timestamp=" + timestamp + "&upload_preset=" + uploadPreset + "" + apiSecret;
        var signature = sha1(paramStr);
        var params = {
          api_key: "427924639774458",
          timestamp: timestamp,
          upload_preset: uploadPreset,
          signature: signature
        };

        APIManager.upload(url, image, params, function (err, response) {
          if (err) {
            alert("UPLOAD ERROR: " + err);
            return;
          }

          var imageUrl = response.secure_url;
          var updatedProfile = Object.assign({}, _this.state.updated);
          updatedProfile.image = imageUrl;

          _this.setState({
            updated: updatedProfile
          });
        }, function (progress) {
          console.log(progress); // image upload callback progress
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var currentUser = this.props.user;
        var image = this.state.updated.image == null ? "" : ImageHelper.thumbnail(this.state.updated.image, 150);

        return React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "h2",
            null,
            "Welcome ",
            currentUser.username
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-md-6" },
              React.createElement("input", {
                id: "username",
                onChange: this.updateCurrentUser.bind(this),
                className: "form-control",
                type: "text",
                defaultValue: currentUser.username,
                placeholder: "Username"
              }),
              React.createElement("br", null),
              React.createElement("input", {
                id: "gender",
                onChange: this.updateCurrentUser.bind(this),
                className: "form-control",
                type: "text",
                defaultValue: currentUser.gender,
                placeholder: "Gender"
              }),
              React.createElement("br", null),
              React.createElement("input", {
                id: "city",
                onChange: this.updateCurrentUser.bind(this),
                className: "form-control",
                type: "text",
                defaultValue: currentUser.city,
                placeholder: "City"
              }),
              React.createElement("br", null),
              React.createElement("textarea", {
                id: "biography",
                className: "form-control",
                onChange: this.updateCurrentUser.bind(this),
                placeholder: "Write your biography here!!",
                defaultValue: currentUser.biography,
                rows: "4",
                cols: "50"
              }),
              React.createElement("img", { src: image }),
              React.createElement("br", null),
              React.createElement(DropZone, { onDrop: this.uploadImage.bind(this) }),
              React.createElement("br", null),
              React.createElement(
                "button",
                {
                  onClick: this.submitProfile.bind(this),
                  className: "btn btn-success"
                },
                "Update Profile"
              )
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return CurrentUser;
})(Component);

var stateToProps = function (state) {
  return {
    user: state.account.user
  };
};

var dispatchToProps = function (dispatch) {
  return {
    updateProfile: function (profile, updated) {
      return dispatch(actions.updateProfile(profile, updated));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(CurrentUser);