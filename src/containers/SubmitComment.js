import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveComment } from '../actions/postActions';

class SubmitComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ''
    };
    // bind
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  // on input change
  onInputChange(e) {
    this.setState({
      body: e.target.value
    });
  }

  // on form submit
  onHandleSubmit(e) {
    e.preventDefault();
    const comment = {
      body: this.state.body
    };
    this.props.saveComment(this.props.id, comment);
    this.setState({
      body: ''
    });
  }

  render() {
    return (
      <div>
        <h3>Add your comment</h3>
        <hr />
        <form onSubmit={this.onHandleSubmit}>
          <input
            ref="_body"
            type="text"
            name="body"
            placeholder="Write your comment here.."
            onChange={this.onInputChange}
            value={this.state.body}
          />
          <button>Add comment</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { saveComment })(SubmitComment);
