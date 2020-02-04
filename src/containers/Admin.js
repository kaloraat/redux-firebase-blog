import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import slug from 'slug';
import { getPosts, savePost, deletePost } from '../actions/postActions';
import { getUser, googleLogin } from '../actions/userActions';
import PostCard from '../components/PostCard';
import { Link, withRouter } from 'react-router-dom';
import Loading from '../components/Loading';

class Admin extends Component {
  componentWillMount() {
    const { user } = this.props;
    if (!user) {
      this.props.history.push('/login');
    }
    if (this.props.postsLoading === undefined) {
      this.props.getPosts();
    }

    if (this.props.user === undefined) {
      this.props.getUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postsLoading === -1) {
      this.props.getPosts();
    }
  }

  componentDidUpdate() {
    const { user } = this.props;
    if (!user) {
      this.props.history.push('/login');
    }
  }
  // render the posts that is received from firebase
  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      return (
        <PostCard key={key}>
          <Link to={`/${key}`}>
            <h3 className="card-title">{post.title}</h3>
          </Link>
          <button onClick={() => this.props.deletePost(key)}>Delete</button>
          <Link to={`/edit/${key}`}>
            <button className="btn btn-success">Edit</button>
          </Link>
        </PostCard>
      );
    });
  }

  // render the posts
  render() {
    return (
      <div>
        {/*<h1>Admin Dashboard</h1>*/}
        {this.props.user === null ? <h1>Admin Dashboard</h1> : ''}
        <hr />
        <button className="btn btn-success">
          <Link to={`/create`}>
            <h2>Create a new post</h2>
          </Link>
        </button>
        <hr />
        <h3>Recent posts</h3>
        {this.props.postsLoading === false && this.props.posts ? <div>{this.renderPosts()}</div> : <Loading />}
      </div>
    );
  }
}
// redux
function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts,
    postsLoading: state.loading.posts,
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps, { getPosts, savePost, deletePost, googleLogin })(Admin));
