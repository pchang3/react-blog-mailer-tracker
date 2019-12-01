import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import './EditPost.css';

class EditPost extends Component {
  state = {
    title: '',
    body: '',
    author: '',
  }

  componentDidMount() {
      axios.get('/posts/' + this.props.match.params.id + '/edit')
        .then(response => {
          this.setState(response.data);
        });
    }

  editDataHandler = (e) => {
    e.preventDefault()
    const data = {
      title: this.state.title,
      body: this.state.body,
      author: this.state.author
    }
    axios.put('/posts/' + this.props.match.params.id, data)
      .then(response => {
        this.props.history.push('/posts/' + this.props.match.params.id);
      });
  }
  
  render() {
    return (
      <div className="container">
        <h1 style={{textAlign: "center"}}>Edit Article</h1>
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
                  value={this.state.body}
                  onChange={(event) => this.setState({body: event.target.value})} />
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
                  onClick={this.editDataHandler}>
                  Submit!</button>
              </div>
            </form>
                <NavLink to={"/posts/" + this.props.match.params.id}>Go Back</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPost;