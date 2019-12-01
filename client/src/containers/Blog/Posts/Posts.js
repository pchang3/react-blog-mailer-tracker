import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../../components/Post/Post';

class Posts extends Component {
  state = {
    posts: [],
    postsLoaded: false
  }

  componentDidMount() {
    axios.get('/posts')
      .then(response => {
        this.setState({ posts: response.data.posts, postsLoaded: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let posts = <div><p style={{ textAlign: 'center' }}>Loading...</p></div>;
    if (this.state.postsLoaded) {
      posts = 
        <div className="row text-center" styles={{display: "flex", flexWrap: "wrap"}}>
          {this.state.posts.map(post => (
              <Post
                key={post._id}
                id={post._id}
                title={post.title}
                body={post.body}
                author={post.author}/>
            )
          )}
        </div>
    }
    return posts;
  }
}

export default Posts;