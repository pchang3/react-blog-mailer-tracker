import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

import styles from './FullPost.module.css';

class FullPost extends Component {
  state = {
    loadedPost: null,
    allUsers: [],
    selectedUserkeys: [],
    selectedUsers: [],
    shareSelected: false
  }

  componentDidMount() {
    axios.get('/posts/' + this.props.match.params.id)
      .then(response => {
        this.setState({ loadedPost: response.data });
      });
  }

  deletePostHandler = () => {
    axios.delete('/posts/' + this.props.match.params.id)
      .then(response => {
        this.props.history.push('/');
      });
  }

  sendPostHandler = (event) => {
    event.preventDefault();
    let data = [];
    let allUsers = this.state.allUsers;
    let selectedUserkeys = this.state.selectedUserkeys;
    for (let i = 0; i < allUsers.length; i++) {
      if (selectedUserkeys.includes(allUsers[i]._id)) {
        data.push(allUsers[i]);
      }
    }
    axios.post('/posts/' + this.props.match.params.id + '/send', data)
      .then(response => {
        this.setState({
          selectedUserkeys: [],
          selectedUsers: [],
          shareSelected: false
        });
      });
  }

  onChangeHandler = (event) => {
    let updatedUserkeys = [];
    let options = event.target.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        updatedUserkeys.push(options[i].value);
      }
    }
    this.setState({ selectedUserkeys: updatedUserkeys});
  }

  shareHandler = () => {
    axios.get('/users')
      .then(response => {
        this.setState({ allUsers: response.data, shareSelected: !this.state.shareSelected });
      });
  }

  duplicateHandler = () => {
    let data = {
      title: this.state.loadedPost.title,
      body: this.state.loadedPost.body,
      author: this.state.loadedPost.author
    };
    axios.post('/posts', data)
      .then(res => this.props.history.push('/posts'));
  }

  editHandler = () => {
    this.props.history.push('/posts/' + this.props.match.params.id + '/edit')
  }

  render() {
    let post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    if (this.state.loadedPost) {
      post = (
        <div className="container">
          <header className="jumbotron">
            <h1 style={{textAlign: "center"}}>{this.state.loadedPost.title}</h1>
            <h4>By {this.state.loadedPost.author}</h4>
            <p>{this.state.loadedPost.body}</p>
            
            <div className={styles.ButtonGroup}>
              <Button variant="danger" onClick={this.deletePostHandler}>Delete</Button>
              <Button variant="warning" onClick={this.editHandler}>Edit</Button>
              <Button variant="primary" onClick={this.shareHandler}>Share</Button>
              <Button variant="info" onClick={this.duplicateHandler}>Duplicate</Button>
            </div>
          </header>
          
        </div>);
    }
    let sendForms = null;
     if (this.state.shareSelected) {
       sendForms = 
          <select multiple={true} value={this.state.selectedUserkeys} onChange={this.onChangeHandler}>
              {this.state.allUsers.map(user =>
               <option key={user._id} value={user._id}>{user.username} : {user.name} : {user.email}</option>
              )};
          </select>
    }

    return (
      <React.Fragment>
        {post}
        <Modal show={this.state.shareSelected} onHide={() => { this.setState({ shareSelected: false }) }}>
          <Modal.Header closeButton>
            <Modal.Title>Send this article to (Use control to select multiple users):</Modal.Title>
          </Modal.Header>
          <Modal.Body>{sendForms}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { this.setState({ shareSelected: false }) }}>
              Close
            </Button>
            <Button variant="primary" onClick={this.sendPostHandler}>
              Send article
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
      )
    }
        
}

export default FullPost;