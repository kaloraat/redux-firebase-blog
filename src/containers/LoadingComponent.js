import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPosts } from '../actions/postActions';
import Loading from '../components/Loading';

class LoadingComponent extends Component {
    componentWillMount() {
        if (this.props.postsLoading === undefined) {
            this.props.getPosts();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.postsLoading === -1) {
            this.props.getPosts();
        }
    }

    render() {
        const { postsLoading, children, posts } = this.props;
        return postsLoading === false && posts ? <div>{children}</div> : <Loading />;
    }
}

function mapStateToProps(state) {
    return {
        postsLoading: state.loading.posts,
        posts: state.posts
    };
}

export default withRouter(connect(mapStateToProps, { getPosts })(LoadingComponent));
