import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import slug from 'slug';
import { getPosts, editPost, imageUpload } from '../actions/postActions';
import PostCard from '../components/PostCard';
import { Link, withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class PostEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.post.title,
      body: this.props.post.body,
      file: this.props.post.image,
      imagePreviewUrl: this.props.post.image
    };
    // bind
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
  }
  // when component mounts load the posts from firebase
  componentWillMount() {
    this.props.getPosts();
  }
  // on input change
  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // quill side
  onBodyChange(value) {
    this.setState({ body: value });
  }
  // for imamge upload
  _handleSubmit(e) {
    e.preventDefault();
    this.props.imageUpload(this.props.match.params.id, this.state.file);
    this.props.history.push('/admin');
  }
  // handle image change
  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }
  // on form submit
  onHandleSubmit(e) {
    e.preventDefault();
    const image = this.state.file;
    const post = {
      title: this.state.title,
      body: this.state.body,
      slug: slug(this.state.title)
    };
    console.log(post);
    this.props.editPost(this.props.match.params.id, post, image);
    this.setState({
      title: '',
      body: ''
    });
    this.props.history.push('/admin');
  }
  // render the posts that is received from firebase
  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      return (
        <PostCard key={key}>
          <Link to={`/${key}`}>
            <h3 className="card-title">{post.title}</h3>
          </Link>
          <p>{post.body}</p>
        </PostCard>
      );
    });
  }
  // render the posts
  // create a form to edit existing post
  render() {
    return (
      <div>
        <h1>Edit {this.props.post.title}</h1>
        {this.state.imagePreviewUrl !== null ? <img src={this.state.imagePreviewUrl} height="200" /> : ''}
        <hr />
        {this.renderPosts()}
        <hr />
        <form onSubmit={this.onHandleSubmit}>
          <input
            ref="_title"
            type="text"
            name="title"
            placeholder="Title"
            onChange={this.onInputChange}
            value={this.state.title}
          />
          <ReactQuill
            modules={PostEdit.modules}
            formats={PostEdit.formats}
            ref="_body"
            name="body"
            value={this.state.body}
            onChange={this.onBodyChange}
            placeholder="Write something.."
          />
          {/*<input
            ref="_body"
            type="text"
            name="body"
            placeholder="Body"
            onChange={this.onInputChange}
            value={this.state.body}
          />*/}
          <button>Edit</button>
        </form>
        <hr />

        <h6>Upload image</h6>
        <form onSubmit={this._handleSubmit}>
          <input type="file" onChange={this._handleImageChange} />
          <button type="submit" onClick={this._handleSubmit}>
            Change Image
          </button>
        </form>
      </div>
    );
  }
}

// Quill Config
PostEdit.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

PostEdit.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'code-block'
];

// redux
function mapStateToProps(state, ownProps) {
  return { post: state.posts[ownProps.match.params.id] };
}

export default withRouter(connect(mapStateToProps, { getPosts, editPost, imageUpload })(PostEdit));
