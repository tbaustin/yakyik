import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ImageHelper } from '../../utils';
import { connect } from 'react-redux';

class Comment extends Component {
  constructor() {
    super();

    this.state = {
      isEditing: false,
      updated: null
    };
  }

  toggleEdit(event) {
    event.preventDefault();

    if (this.state.isEditing == true) {
      if (this.state.updated != null) {
        this.props.onUpdate(this.props.comment, this.state.updated.body);
      }
    }

    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  componentDidUpdate() {
    // console.log(this.state.isEditing);
  }

  updateBody(event) {
    let updatedComment = Object.assign({}, this.state.updated);
    updatedComment[event.target.id] = event.target.value;
    this.setState({
      updated: updatedComment
    });
  }

  render() {
    const { comment } = this.props;
    const radius = 20;
    const editable = this.props.isEditable ? this.props.isEditable : false;

    let content = null;
    if (this.state.isEditing == true) {
      content = (
        <div className="single-comment">
          <p className="comment-body">
            <textarea
              id="body"
              onChange={this.updateBody.bind(this)}
              className="form-control"
              defaultValue={comment.body}
            />
          </p>
          <img
            style={{ borderRadius: radius, marginRight: 6 }}
            src={ImageHelper.thumbnail(comment.author.image, radius * 2)}
          />
          <span className="comment-username">
            <Link to={`/profile/${comment.author.username}`}>
              {comment.author.username}
            </Link>
          </span>

          <span className="comment-hr">|</span>
          <span className="comment-timestamp">
            {comment.timestamp}
          </span>
          <button
            onClick={this.toggleEdit.bind(this)}
            className="btn btn-warning"
            style={{ marginLeft: 10 }}
          >
            Done
          </button>
          <hr />
        </div>
      );
    } else {
      content = (
        <div className="single-comment">
          <p className="comment-body">
            {comment.body}
          </p>
          <img
            style={{ borderRadius: radius, marginRight: 6 }}
            src={ImageHelper.thumbnail(comment.author.image, radius * 2)}
          />
          <span className="comment-username">
            <Link to={`/profile/${comment.author.username}`}>
              {comment.author.username}
            </Link>
          </span>

          <span className="comment-hr">|</span>
          <span className="comment-timestamp">
            {comment.timestamp}
          </span>
          {editable
            ? <button
                onClick={this.toggleEdit.bind(this)}
                className="btn btn-warning"
                style={{ marginLeft: 10 }}
              >
                Edit
              </button>
            : null}

          <hr />
        </div>
      );
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.account.user
  };
};

export default connect(stateToProps)(Comment);
