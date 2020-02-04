import React, { Component } from 'react';
import { getUser, googleLogin, logout } from '../actions/userActions';
import { connect } from 'react-redux';

class Login extends Component {
  componentWillMount() {
    this.props.getUser();
    if (this.props.user !== null) {
      this.props.history.push('/admin');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== null) {
      nextProps.history.push('/admin');
    }
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.props.googleLogin}>
          <span className="fa fa-google" /> Sign in with Google
        </button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { user: state.user };
}

export default connect(mapStateToProps, { getUser, googleLogin, logout })(Login);
