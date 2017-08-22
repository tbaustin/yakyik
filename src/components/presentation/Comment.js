import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return (
      <div className="single-comment">
        <p className="comment-body">
          {this.props.comment.body}
        </p>
        <span className="comment-username">
          {this.props.comment.username}
        </span>

        <span className="comment-hr">|</span>
        <span className="comment-timestamp">
          {this.props.comment.timestamp}
        </span>
        <hr />
      </div>
    );
  }
}

export default Comment;
