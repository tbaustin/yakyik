import React, { Component } from 'react';
import { APIManager } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import { Link } from 'react-router-dom';

class Accounts extends Component {
  constructor() {
    super();

    this.state = {
      profile: {
        username: '',
        password: '',
        city: '',
        gender: ''
      }
    };
  }

  componentDidMount() {
    APIManager.get('/account/currentuser', null, (err, response) => {
      if (err) {
        // not logged in, ingore error
        // alert(`ERROR: ${err.message}`);
        return;
      }

      this.props.currentUserReceived(response.user);
    });
  }

  updateProfile(event) {
    event.preventDefault();

    let updatedProfile = Object.assign({}, this.state.profile);
    updatedProfile[event.target.id] = event.target.value;

    this.setState({
      profile: updatedProfile
    });
  }

  logout(event) {
    event.preventDefault();

    APIManager.get('/account/logout', null, (err, response) => {
      if (err) {
        alert(`ERROR: ${err.message}`);
        return;
      }
      this.props.currentUserReceived(null);
      alert(response.message);
    });
  }

  login(event) {
    event.preventDefault();
    if (this.state.profile.username.length == 0) {
      alert('Please enter your username');
      return;
    }

    if (this.state.profile.password.length == 0) {
      alert('Please enter your password');
      return;
    }
    APIManager.post('/account/login', this.state.profile, (err, response) => {
      if (err) {
        alert(`ERROR: ${err.message}`);
        return;
      }

      this.props.currentUserReceived(response.user);
    });
  }

  signup(event) {
    event.preventDefault();
    if (this.state.profile.username.length == 0) {
      alert('Please enter your username');
      return;
    }

    if (this.state.profile.password.length == 0) {
      alert('Please enter your password');
      return;
    }

    APIManager.post(
      '/account/register',
      this.state.profile,
      (err, response) => {
        if (err) {
          alert(`ERROR: ${err.message}`);
          return;
        }

        this.props.currentUserReceived(response.user);
      }
    );
  }

  render() {
    let content = null;
    if (this.props.user == null) {
      content = (
        <div>
          <h2>Login</h2>
          <input
            id="username"
            onChange={this.updateProfile.bind(this)}
            type="text"
            placeholder="username"
          />
          <br />
          <input
            id="password"
            onChange={this.updateProfile.bind(this)}
            type="password"
            placeholder="password"
          />
          <br />
          <button onClick={this.login.bind(this)}>Log In</button>
          <h2>Sign Up</h2>
          <input
            id="username"
            onChange={this.updateProfile.bind(this)}
            type="text"
            placeholder="username"
          />
          <br />
          <input
            id="password"
            onChange={this.updateProfile.bind(this)}
            type="password"
            placeholder="password"
          />
          <br />
          <input
            id="city"
            onChange={this.updateProfile.bind(this)}
            type="text"
            placeholder="City"
          />
          <br />
          <input
            id="gender"
            onChange={this.updateProfile.bind(this)}
            type="text"
            placeholder="Gender"
          />
          <textarea
            id="biography"
            className="form-control"
            onChange={this.updateProfile.bind(this)}
            value="Write your biography here!!"
            rows="4"
            cols="50"
          />
          <br />
          <button onClick={this.signup.bind(this)}>Join</button>
        </div>
      );
    } else {
      content = (
        <div>
          <h2>
            Welcome {this.props.user.username}
          </h2>
          <span>
            {this.props.user.city}
          </span>
          <br />
          <button onClick={this.logout.bind(this)}>Log Out</button>
          <Link to="/currentuser">
            <button>Account</button>
          </Link>
        </div>
      );
    }
    return content;
  }
}

const stateToProps = state => {
  return {
    user: state.account.user
  };
};

const dispatchToProps = dispatch => {
  return {
    currentUserReceived: user => dispatch(actions.currentUserReceived(user))
  };
};

export default connect(stateToProps, dispatchToProps)(Accounts);
