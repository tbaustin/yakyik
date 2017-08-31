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
    if (this.props.zones.length > 0) {
      return;
    }
    this.props.fetchZones(null);
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
    const zoneList = this.props.zones.map((item, i) => {
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

    let header = (
      <div>
        <h2>Zones</h2>
        <ul>
          {zoneList}
        </ul>

        <CreateZone onCreate={this.submitZone.bind(this)} />
      </div>
    );

    let content = this.props.appStatus == 'loading' ? 'LOADING...' : header;

    return (
      <div className="zone-container">
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    zones: state.zone.list,
    selected: state.zone.selectedZone,
    appStatus: state.zone.appStatus
  };
};

const dispatchToProps = dispatch => {
  return {
    fetchZones: params => dispatch(actions.fetchZones(params)),
    zoneCreated: zone => dispatch(actions.zoneCreated(zone)),
    selectZone: zoneIndex => dispatch(actions.selectZone(zoneIndex))
  };
};

export default connect(mapStateToProps, dispatchToProps)(Zones);
