import React, { Component } from 'react';
import { APIManager } from '../../utils';

class Accounts extends Component {
  constructor() {
    super();

    this.state = {
      profile: {
        username: '',
        password: ''
      }
    };
  }

  updateProfile(event) {
    event.preventDefault();

    let updatedProfile = Object.assign({}, this.state.profile);
    updatedProfile[event.target.id] = event.target.value;

    this.setState({
      profile: updatedProfile
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

      alert(`Welcome back ${response.user.username} :D`);
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

        alert(
          `Thank you joining us! YOU ROCK --> ${response.user
            .username} <-- YOU ROCK`
        );
      }
    );
  }

  render() {
    return (
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
        <button onClick={this.signup.bind(this)}>Join</button>
      </div>
    );
  }
}

export default Accounts;
