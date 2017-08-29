import React, { Component } from 'react';
import { Zones, Comments, Accounts } from '../containers';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Accounts />
            <Zones />
          </div>
          <div className="col-md-8">
            <Comments />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
