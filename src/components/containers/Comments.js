import React, { Component } from 'react';
import Comment from '../presentation/Comment';
import axios from 'axios';

class Comments extends Component {
  constructor() {
    super();

    this.state = {
      comment: {
        username: '',
        body: '',
        timestamp: ''
      },
      list: []
    };
  }

  componentDidMount() {
    axios
      .get('/api/comment')
      .then(response => {
        const { confirmation, results } = response.data;
        if (confirmation == 'success') {
          this.setState({
            list: results
          });
        }
      })
      .catch(err => {
        alert(`Error: ${err}`);
      });
  }

  submitComment() {
    let updatedList = Object.assign([], this.state.list);
    updatedList.push(this.state.comment);
    this.setState({
      list: updatedList
    });
  }

  updateComment(event) {
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment[event.target.id] = event.target.value;
    this.setState({
      comment: updatedComment
    });
  }

  render() {
    const commentList = this.state.list.map((comment, i) => {
      return (
        <li key={i}>
          <Comment comment={comment} />
        </li>
      );
    });

    return (
      <div className="comment-container">
        <h2>Comments: Zone 1</h2>
        <ul>
          {commentList}
        </ul>

        <input
          id="username"
          onChange={this.updateComment.bind(this)}
          className="form-control"
          type="text"
          placeholder="Username"
        />
        <br />
        <input
          id="body"
          onChange={this.updateComment.bind(this)}
          className="form-control"
          type="text"
          placeholder="Comment"
        />
        <br />
        <input
          id="timestamp"
          onChange={this.updateComment.bind(this)}
          className="form-control"
          type="text"
          placeholder="Timestamp"
        />
        <br />
        <button
          onClick={this.submitComment.bind(this)}
          className="btn btn-info"
        >
          Submit Comment
        </button>
      </div>
    );
  }
}

export default Comments;
