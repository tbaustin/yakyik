import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import DropZone from 'react-dropzone';
import { APIManager, ImageHelper } from '../../utils';
import sha1 from 'sha1';

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

  uploadImage(files) {
    const image = files[0];

    const cloudName = 'hyszj0vmt';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const apiSecret = '_lruNZ8yrruUqb9RDGYeVE23YcI';
    const uploadPreset = 'rhmvjoqw';
    const timestamp = Date.now() / 1000;
    const paramStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}${apiSecret}`;
    const signature = sha1(paramStr);
    const params = {
      api_key: '427924639774458',
      timestamp: timestamp,
      upload_preset: uploadPreset,
      signature: signature
    };

    APIManager.upload(
      url,
      image,
      params,
      (err, response) => {
        if (err) {
          alert(`UPLOAD ERROR: ${err}`);
          return;
        }

        const imageUrl = response['secure_url'];
        let updatedProfile = Object.assign({}, this.state.updated);
        updatedProfile['image'] = imageUrl;

        this.setState({
          updated: updatedProfile
        });
      },
      progress => {
        console.log(progress); // image upload callback progress
      }
    );
  }

  render() {
    const currentUser = this.props.user;
    const image =
      this.state.updated.image == null
        ? ''
        : ImageHelper.thumbnail(this.state.updated.image, 150);

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
            <img src={image} />
            <br />
            <DropZone onDrop={this.uploadImage.bind(this)} />
            <br />
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
