import React, { Component } from 'react';
import { Zone, CreateZone } from '../presentation';
import { APIManager } from '../../utils';
import actions from '../../actions/actions';
import { connect } from 'react-redux';

class Zones extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    APIManager.get('/api/zone', null, (err, response) => {
      if (err) {
        alert(`ERROR apiget: ${err.message}`);
        return;
      }

      this.props.zonesReceived(response.results);
    });
  }

  submitZone(zone) {
    let updatedZone = Object.assign({}, zone);

    APIManager.post('/api/zone', updatedZone, (err, response) => {
      if (err) {
        alert(`ERROR: ${err.message}`);
        return;
      }

      this.props.zoneCreated(response.result);
    });
  }

  selectZone(zoneIndex) {
    this.props.selectZone(zoneIndex);
  }

  render() {
    const listItems = this.props.zones.map((item, i) => {
      let selected = i == this.props.selected;
      return (
        <li key={i}>
          <Zone
            zoneIndex={i}
            select={this.selectZone.bind(this)}
            isSelected={selected}
            zone={item}
          />
        </li>
      );
    });

    return (
      <div className="zone-container">
        <h2>Zones</h2>
        <ul>
          {listItems}
        </ul>

        <CreateZone onCreate={this.submitZone.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    zones: state.zone.list,
    selected: state.zone.selectedZone
  };
};

const dispatchToProps = dispatch => {
  return {
    zonesReceived: zones => dispatch(actions.zonesReceived(zones)),
    zoneCreated: zone => dispatch(actions.zoneCreated(zone)),
    selectZone: zoneIndex => dispatch(actions.selectZone(zoneIndex))
  };
};

export default connect(mapStateToProps, dispatchToProps)(Zones);
