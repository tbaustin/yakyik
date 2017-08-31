import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions/actions';

class CurrentUser extends Component {
  constructor() {
    super();

    this.state = {
      updated: {}
    };
  }

  componentDidMount() {}

  updateCurrentUser(event) {
    event.preventDefault();

    let updatedProfile = Object.assign({}, this.state.updated);
    updatedProfile[event.target.id] = event.target.value;
    this.setState({
      updated: updatedProfile
    });
  }

  submitProfile(event) {
    event.preventDefault();
    if (Object.values(this.state.updated).length == 0) {
      alert('No Changes Made!!');
      return;
    }
    //Prevents a user from typing and then deleting the value to submit an empty object
    let submitArray = [];
    //some is array method that will "break" or "stop" iteration as soon as a value is true
    Object.values(this.state.updated).some(item => {
      if (item != '') {
        submitArray.push(item);
        return submitArray;
      }
    });

    if (submitArray.length == 0) {
      alert('No Changes Made!!');
      return;
    }

    this.props.updateProfile(this.props.user, this.state.updated);
  }

  render() {
    const currentUser = this.props.user;
    return (
      <div className="container">
        <h2>
          Welcome {currentUser.username}
        </h2>
        <div className="row">
          <div className="col-md-6">
            <input
              id="username"
              onChange={this.updateCurrentUser.bind(this)}
              className="form-control"
              type="text"
              defaultValue={currentUser.username}
              placeholder="Username"
            />
            <br />
            <input
              id="gender"
              onChange={this.updateCurrentUser.bind(this)}
              className="form-control"
              type="text"
              defaultValue={currentUser.gender}
              placeholder="Gender"
            />
            <br />
            <input
              id="city"
              onChange={this.updateCurrentUser.bind(this)}
              className="form-control"
              type="text"
              defaultValue={currentUser.city}
              placeholder="City"
            />
            <br />
            <textarea
              id="biography"
              className="form-control"
              onChange={this.updateCurrentUser.bind(this)}
              placeholder="Write your biography here!!"
              defaultValue={currentUser.biography}
              rows="4"
              cols="50"
            />
            <button
              onClick={this.submitProfile.bind(this)}
              className="btn btn-success"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.account.user
  };
};

const dispatchToProps = dispatch => {
  return {
    updateProfile: (profile, updated) =>
      dispatch(actions.updateProfile(profile, updated))
  };
};

export default connect(stateToProps, dispatchToProps)(CurrentUser);
