"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Zone = (function (Component) {
  function Zone() {
    _classCallCheck(this, Zone);

    if (Component != null) {
      Component.apply(this, arguments);
    }
  }

  _inherits(Zone, Component);

  _prototypeProperties(Zone, null, {
    onSelectTitle: {
      value: function onSelectTitle(event) {
        event.preventDefault();
        this.props.select(this.props.zoneIndex);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var title = this.props.isSelected ? React.createElement(
          "a",
          { href: "#", className: "zone-selected" },
          this.props.zone.name
        ) : React.createElement(
          "a",
          { href: "#" },
          this.props.zone.name
        );

        return React.createElement(
          "div",
          { className: "zone-div" },
          React.createElement(
            "h2",
            { onClick: this.onSelectTitle.bind(this), className: "zone-header" },
            title
          ),
          React.createElement(
            "span",
            null,
            this.props.zone.zipCodes
          ),
          React.createElement("br", null),
          React.createElement(
            "span",
            null,
            this.props.zone.numComments,
            " comments"
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Zone;
})(Component);

module.exports = Zone;