"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Link = require("react-router-dom").Link;
var ImageHelper = require("../../utils").ImageHelper;
var connect = require("react-redux").connect;
var Comment = (function (Component) {
  function Comment() {
    _classCallCheck(this, Comment);

    _get(Object.getPrototypeOf(Comment.prototype), "constructor", this).call(this);

    this.state = {
      isEditing: false,
      updated: null
    };
  }

  _inherits(Comment, Component);

  _prototypeProperties(Comment, null, {
    toggleEdit: {
      value: function toggleEdit(event) {
        event.preventDefault();

        if (this.state.isEditing == true) {
          if (this.state.updated != null) {
            this.props.onUpdate(this.props.comment, this.state.updated.body);
          }
        }

        this.setState({
          isEditing: !this.state.isEditing
        });
      },
      writable: true,
      configurable: true
    },
    componentDidUpdate: {
      value: function componentDidUpdate() {},
      writable: true,
      configurable: true
    },
    updateBody: {
      value: function updateBody(event) {
        var updatedComment = Object.assign({}, this.state.updated);
        updatedComment[event.target.id] = event.target.value;
        this.setState({
          updated: updatedComment
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var comment = this.props.comment;
        var radius = 20;
        var editable = this.props.isEditable ? this.props.isEditable : false;

        var content = null;
        if (this.state.isEditing == true) {
          content = React.createElement(
            "div",
            { className: "single-comment" },
            React.createElement(
              "p",
              { className: "comment-body" },
              React.createElement("textarea", {
                id: "body",
                onChange: this.updateBody.bind(this),
                className: "form-control",
                defaultValue: comment.body
              })
            ),
            React.createElement("img", {
              style: { borderRadius: radius, marginRight: 6 },
              src: ImageHelper.thumbnail(comment.author.image, radius * 2)
            }),
            React.createElement(
              "span",
              { className: "comment-username" },
              React.createElement(
                Link,
                { to: "/profile/" + comment.author.username },
                comment.author.username
              )
            ),
            React.createElement(
              "span",
              { className: "comment-hr" },
              "|"
            ),
            React.createElement(
              "span",
              { className: "comment-timestamp" },
              comment.timestamp
            ),
            React.createElement(
              "button",
              {
                onClick: this.toggleEdit.bind(this),
                className: "btn btn-warning",
                style: { marginLeft: 10 }
              },
              "Done"
            ),
            React.createElement("hr", null)
          );
        } else {
          content = React.createElement(
            "div",
            { className: "single-comment" },
            React.createElement(
              "p",
              { className: "comment-body" },
              comment.body
            ),
            React.createElement("img", {
              style: { borderRadius: radius, marginRight: 6 },
              src: ImageHelper.thumbnail(comment.author.image, radius * 2)
            }),
            React.createElement(
              "span",
              { className: "comment-username" },
              React.createElement(
                Link,
                { to: "/profile/" + comment.author.username },
                comment.author.username
              )
            ),
            React.createElement(
              "span",
              { className: "comment-hr" },
              "|"
            ),
            React.createElement(
              "span",
              { className: "comment-timestamp" },
              comment.timestamp
            ),
            editable ? React.createElement(
              "button",
              {
                onClick: this.toggleEdit.bind(this),
                className: "btn btn-warning",
                style: { marginLeft: 10 }
              },
              "Edit"
            ) : null,
            React.createElement("hr", null)
          );
        }
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

  return Comment;
})(Component);

var stateToProps = function (state) {
  return {
    user: state.account.user
  };
};

module.exports = connect(stateToProps)(Comment);
// console.log(this.state.isEditing);