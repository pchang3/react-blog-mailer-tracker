import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../../../components/Post/Post';
import profilePic from '../../../../assets/images/defaultProfileImage.jpeg';

class UserDetail extends Component {
  state = {
    loadedUser: null,
    sentPosts: []
  }

  componentDidMount() {
    axios.get('/users/' + this.props.match.params.id)
      .then(response => {
        this.setState({ loadedUser: response.data, sentPosts: response.data.posts });
      });
  }

  render() {
    let output = null;
    if (this.state.loadedUser) {
      output = (
        <div>
          <div className="container" style={{margin: "12px auto"}}>
            <div className="row">
              <div className="col-sm-4">
                <img className="rounded" src={profilePic} alt="profilePic" style={{width: "100%"}}/>
              </div>
              <div className="col-sm-8"> 
                <table className="table">
                  <tbody>
                    <tr>
                    <th scope="row">Name</th>
                    <td>{this.state.loadedUser.name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Username</th>
                    <td>{this.state.loadedUser.username}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{this.state.loadedUser.email}</td>
                  </tr>
                  </tbody>
                </table>
              </div>        
            </div>
          </div>

          <div>
            <h2 style={{textAlign: "center"}}>Articles Sent to {this.state.loadedUser.username}</h2>
            <div className="row text-center" styles={{display: "flex", flexWrap: "wrap"}}>
              {this.state.sentPosts.map(post => (
                  <Post
                    id={post.postid}
                    title={post.title}
                    body={post.body}
                    author={post.author}
                    status={post.status}/>
                )
              )}
            </div>
          </div>
        </div>
          );
      }
  
    return output;
    }
}

export default UserDetail;