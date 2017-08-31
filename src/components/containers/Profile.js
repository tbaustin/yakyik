import React, { Component } from 'react';
import { APIManager } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../actions/actions';

class Profile extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { profiles } = this.props;

    const profile = profiles[this.props.username];
    if (profile != null) return;
    this.props.fetchProfile({ username: this.props.username });
  }

  render() {
    const { profiles } = this.props;
    let profile = profiles[this.props.username];

    let header = null;
    if (profile != null) {
      header = (
        <div>
          <h3>
            {profile.username}
          </h3>
          <p>
            city: {profile.city}
          </p>
          <p>
            gender: {profile.gender}
          </p>
          <p>
            biography: {profile.biography}
          </p>
        </div>
      );
    }

    let content = this.props.appStatus == 'loading' ? 'Loading...' : header;

    return (
      <div>
        {content}
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    profiles: state.profile.map,
    appStatus: state.profile.appStatus
  };
};

const dispatchToProps = dispatch => {
  return {
    fetchProfile: params => dispatch(actions.fetchProfile(params))
  };
};

export default connect(stateToProps, dispatchToProps)(Profile);
