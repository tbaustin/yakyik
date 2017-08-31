import React, { Component } from 'react';
import { Profile } from '../containers';

class ProfileInfo extends Component {
  componentDidMount() {}

  render() {
    const { username } = this.props.match.params;
    return (
      <div>
        Profile Info Layout
        <div>
          <Profile username={username} />
        </div>
      </div>
    );
  }
}

export default ProfileInfo;
