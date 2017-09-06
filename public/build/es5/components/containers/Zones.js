"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _presentation = require("../presentation");

var Zone = _presentation.Zone;
var CreateZone = _presentation.CreateZone;
var APIManager = require("../../utils").APIManager;
var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var Zones = (function (Component) {
  function Zones() {
    _classCallCheck(this, Zones);

    _get(Object.getPrototypeOf(Zones.prototype), "constructor", this).call(this);
  }

  _inherits(Zones, Component);

  _prototypeProperties(Zones, null, {
    componentDidMount: {
      value: function componentDidMount() {
        if (this.props.zones.length > 0) {
          return;
        }
        this.props.fetchZones(null);
      },
      writable: true,
      configurable: true
    },
    submitZone: {
      value: function submitZone(zone) {
        var _this = this;
        var updatedZone = Object.assign({}, zone);

        APIManager.post("/api/zone", updatedZone, function (err, response) {
          if (err) {
            alert("ERROR: " + err.message);
            return;
          }

          _this.props.zoneCreated(response.result);
        });
      },
      writable: true,
      configurable: true
    },
    selectZone: {
      value: function selectZone(zoneIndex) {
        this.props.selectZone(zoneIndex);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;
        var zoneList = this.props.zones.map(function (item, i) {
          var selected = i == _this.props.selected;
          return React.createElement(
            "li",
            { key: i },
            React.createElement(Zone, {
              zoneIndex: i,
              select: _this.selectZone.bind(_this),
              isSelected: selected,
              zone: item
            })
          );
        });

        var header = React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            null,
            "Zones"
          ),
          React.createElement(
            "ul",
            null,
            zoneList
          ),
          React.createElement(CreateZone, { onCreate: this.submitZone.bind(this) })
        );

        var content = this.props.appStatus == "loading" ? "LOADING..." : header;

        return React.createElement(
          "div",
          { className: "zone-container" },
          content
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Zones;
})(Component);

var mapStateToProps = function (state) {
  return {
    zones: state.zone.list,
    selected: state.zone.selectedZone,
    appStatus: state.zone.appStatus
  };
};

var dispatchToProps = function (dispatch) {
  return {
    fetchZones: function (params) {
      return dispatch(actions.fetchZones(params));
    },
    zoneCreated: function (zone) {
      return dispatch(actions.zoneCreated(zone));
    },
    selectZone: function (zoneIndex) {
      return dispatch(actions.selectZone(zoneIndex));
    }
  };
};

module.exports = connect(mapStateToProps, dispatchToProps)(Zones);