import React, { Component } from 'react';

class Zone extends Component {
  render() {
    return (
      <div className="zone-div">
        <h2 className="zone-header">
          <a className="zone-title" href="#">
            {this.props.zone.name}
          </a>
        </h2>
        <span>
          {this.props.zone.zipCodes}
        </span>
        <br />
        <span>
          {this.props.zone.numComments} comments
        </span>
      </div>
    );
  }
}

export default Zone;
