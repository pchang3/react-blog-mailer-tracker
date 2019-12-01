import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
  state = {
    title: '',
    content: '',
    author: '',
    submitted: false
  }

  postDataHandler = (e) => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author
    }
    axios.post('/posts', data)
      .then(response => {
        this.props.history.push('/');
      });
  }

  

  render() {
    return (
      <div className="container">
        <h1 style={{textAlign: "center"}}>Create a New Article</h1>
        <div className="row">
              <div style={{width: "80%", margin: "25px auto"}}>
                <form>
                    <div className="form-group">
                      <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Title"
                        value={this.state.title} 
                        onChange={(event) => this.setState({title: event.target.value})}/>
                    </div>
                    <div className="form-group">
                      <textarea 
                        className="form-control" 
                        placeholder="Content"
                        rows="4"
                        value={this.state.content}
                        onChange={(event) => this.setState({content: event.target.value})} />
                    </div>
                    <div className="form-group">
                      <input 
                        className="form-control" 
                        type="text"
                        placeholder="Author" 
                        value={this.state.author}
                        onChange={(event) => this.setState({ author: event.target.value })}
                        />
                    </div>
                    <div className="form-group">
                      <button 
                        className="btn btn-lg btn-default btn-primary btn-block"
                        onClick={this.postDataHandler}>
                        Submit!</button>
                    </div>
                </form>
            <NavLink to="/posts">Go Back</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPost;