import React, { Component } from 'react';
import Zone from '../presentation/Zone';
import axios from 'axios';

class Zones extends Component {
  constructor() {
    super();

    this.state = {
      Zone: {
        name: '',
        zipCodes: ''
      },
      list: []
    };
  }

  componentDidMount() {
    axios
      .get('/api/zone')
      .then(response => {
        const { confirmation, results } = response.data;
        if (confirmation == 'success') {
          this.setState({
            list: results
          });
        }
      })
      .catch(err => {
        alert(`ERROR: ${err}`);
      });
  }

  updateZone(event) {
    let updatedZone = Object.assign({}, this.state.zone);
    updatedZone[event.target.id] = event.target.value;
    this.setState({
      zone: updatedZone
    });
  }

  submitZone() {
    let updatedList = Object.assign([], this.state.list);
    updatedList.push(this.state.zone);
    this.setState({
      list: updatedList
    });
  }

  render() {
    const listItems = this.state.list.map((item, i) => {
      return (
        <li key={i}>
          <Zone zone={item} />
        </li>
      );
    });

    return (
      <div className="zone-container">
        <h2>Zones</h2>
        <ul>
          {listItems}
        </ul>

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

export default Zones;
