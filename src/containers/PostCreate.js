import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import slug from 'slug';
import { getPosts, savePost, deletePost, imageUpload } from '../actions/postActions';
import PostCard from '../components/PostCard';
import { Link, withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      file: '',
      imagePreviewUrl: ''
    };
    // bind
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
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
  // handle image upload change
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
    this.props.savePost(post, image);
    this.setState({
      title: '',
      body: ''
    });
    this.props.history.push('/admin');
  }
  // render the posts
  // create a form to add a new post
  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} height="200" />;
    }
    return (
      <div>
        <h1>Create a new post</h1>
        {$imagePreview}
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
            modules={PostCreate.modules}
            formats={PostCreate.formats}
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
          <input type="file" onChange={this._handleImageChange} />
          <button>Post</button>
        </form>
      </div>
    );
  }
}

// Quill Config
PostCreate.modules = {
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

PostCreate.formats = [
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
  return {
    posts: state.posts
  };
}

export default withRouter(connect(mapStateToProps, { getPosts, savePost, deletePost, imageUpload })(PostCreate));
