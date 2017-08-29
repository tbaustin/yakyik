import React, { Component } from 'react';

class Zone extends Component {
  onSelectTitle(event) {
    event.preventDefault();
    this.props.select(this.props.zoneIndex);
  }

  render() {
    const title = this.props.isSelected
      ? <a href="#" className="zone-selected">
          {this.props.zone.name}
        </a>
      : <a href="#">
          {this.props.zone.name}
        </a>;

    return (
      <div className="zone-div">
        <h2 onClick={this.onSelectTitle.bind(this)} className="zone-header">
          {title}
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
