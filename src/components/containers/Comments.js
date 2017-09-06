import React, { Component } from 'react';
import { Comment, CreateComment } from '../presentation';
import { APIManager } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../actions/actions';

class Comments extends Component {
  constructor() {
    super();

    this.checkForComments = this.checkForComments.bind(this);
  }

  checkForComments() {
    let zone = this.props.zones[this.props.zoneIndex];
    if (zone == null) {
      console.log('No Selected Zone');
      return;
    }

    let commentsArray = this.props.commentsMap[zone._id];
    if (commentsArray != null) {
      return;
    }

    APIManager.get('/api/comment', { zone: zone._id }, (err, response) => {
      if (err) {
        alert(`ERROR from apigetcomments: ${err.message}`);
        return;
      }

      this.props.commentsReceived(response.results, zone);
    });
  }

  componentDidMount() {
    this.checkForComments();
  }

  componentDidUpdate() {
    this.checkForComments();
  }

  submitComment(comment) {
    if (this.props.user == null) {
      alert('Please Sign Up or Log In to comment!');
      return;
    }
    let updatedComment = Object.assign({}, comment);

    let zone = this.props.zones[this.props.zoneIndex];
    updatedComment['zone'] = zone._id;
    updatedComment['username'] = this.props.user.username;
    updatedComment['author'] = this.props.user;

    APIManager.post('/api/comment', updatedComment, (err, response) => {
      if (err) {
        alert(`ERROR: ${err.message}`);
        return;
      }

      // this.props.commentsReceived([comments], zone);
      this.props.commentCreated(response.result);
    });
  }

  updateComment(comment, updatedBody) {
    this.props.updateComment(comment, { body: updatedBody });
  }

  render() {
    const selectedZone = this.props.zones[this.props.zoneIndex];
    const currentUser = this.props.user; // null if not logged in

    let zoneName = null;
    let commentList = null;

    if (selectedZone != null) {
      zoneName = selectedZone.name;

      let zoneComments = this.props.commentsMap[selectedZone._id];
      if (zoneComments != null) {
        commentList = zoneComments.map((comment, i) => {
          let editable = false;
          if (currentUser != null) {
            if (currentUser._id == comment.author._id) {
              editable = true;
            }
          }

          return (
            <li key={i}>
              <Comment
                onUpdate={this.updateComment.bind(this)}
                isEditable={editable}
                comment={comment}
              />
            </li>
          );
        });
      }
    }

    return (
      <div>
        <h2>
          {zoneName} : Comments
        </h2>
        <div className="comment-container">
          <ul>
            {commentList}
          </ul>

          <CreateComment onCreate={this.submitComment.bind(this)} />
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    commentsMap: state.comment.map,
    zoneIndex: state.zone.selectedZone,
    zones: state.zone.list,
    commentsLoaded: state.comment.commentsLoaded,
    user: state.account.user
  };
};

const dispatchToProps = dispatch => {
  return {
    commentsReceived: (comments, zone) =>
      dispatch(actions.commentsReceived(comments, zone)),
    commentCreated: comment => dispatch(actions.commentCreated(comment)),
    updateComment: (comment, params) =>
      dispatch(actions.updateComment(comment, params))
  };
};

export default connect(stateToProps, dispatchToProps)(Comments);
