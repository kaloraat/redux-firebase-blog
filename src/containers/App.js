import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import slug from 'slug';
import { getPosts, savePost } from '../actions/postActions';
import PostCard from '../components/PostCard';
import { Link, withRouter } from 'react-router-dom';
import renderHTML from 'react-render-html';
import '../styles/index.css';

class App extends Component {
  // render the posts that is received from firebase
  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      return (
        <PostCard key={key}>
          <Link to={`/${key}`}>
            <h3 className="card-title">{post.title}</h3>
          </Link>
          <div>{renderHTML(post.body)}</div>
        </PostCard>
      );
    });
  }

  // render the posts
  render() {
    return (
      <div>
        <h1>Recent posts</h1>
        {this.renderPosts()}
      </div>
    );
  }
}
// redux
function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts
  };
}

export default withRouter(connect(mapStateToProps, { getPosts, savePost })(App));
