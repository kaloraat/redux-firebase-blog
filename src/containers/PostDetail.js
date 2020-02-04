import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import SubmitComment from './SubmitComment';
import _ from 'lodash';
import Comment from '../components/Comment';
import { imageUpload } from '../actions/postActions';
import renderHTML from 'react-render-html';

class PostDetail extends Component {
    renderComments() {
        return _.map(this.props.post.comments, (comment, key) => {
            return (
                <Comment key={key} id={key}>
                    {comment.body}
                </Comment>
            );
        });
    }
    render() {
        const { post, match } = this.props;
        // console.log(match.params.id.key);
        return (
            <div>
                <PostCard>
                    <Link to={'/'}>Go Home</Link>
                    <div>
                        <h1>{post.title}</h1>
                        <div>{renderHTML(post.body)}</div>
                        <img src={post.image} width="300" />
                        <SubmitComment id={match.params.id} {...match} />
                    </div>
                </PostCard>
                {this.renderComments()}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { imageUpload })(PostDetail);
