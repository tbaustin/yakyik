import React, { Component } from 'react';

class CreateZone extends Component {
  constructor() {
    super();
    this.state = {
      zone: {
        name: '',
        zipCodes: ''
      }
    };
  }

  updateZone(event) {
    let updatedZone = Object.assign({}, this.state.zone);
    updatedZone[event.target.id] = event.target.value;
    this.setState({
      zone: updatedZone
    });
  }

  submitZone(event) {
    let updatedZone = Object.assign({}, this.state.zone);
    updatedZone['zipCodes'] = updatedZone.zipCodes.split(',');

    this.props.onCreate(updatedZone);
  }

  render() {
    return (
      <div>
        <input
          id="name"
          onChange={this.updateZone.bind(this)}
          className="form-control"
          type="text"
          placeholder="Zone"
        />
        <br />
        <input
          id="zipCodes"
          onChange={this.updateZone.bind(this)}
          className="form-control"
          type="text"
          placeholder="Zip Codes"
        />
        <br />
        <button onClick={this.submitZone.bind(this)} className="btn btn-danger">
          Add Zone
        </button>
      </div>
    );
  }
}

export default CreateZone;
