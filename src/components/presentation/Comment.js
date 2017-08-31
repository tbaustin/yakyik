import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="single-comment">
        <p className="comment-body">
          {comment.body}
        </p>
        <span className="comment-username">
          <Link to={`/profile/${comment.username}`}>
            {comment.username}
          </Link>
        </span>

        <span className="comment-hr">|</span>
        <span className="comment-timestamp">
          {comment.timestamp}
        </span>
        <hr />
      </div>
    );
  }
}

export default Comment;
