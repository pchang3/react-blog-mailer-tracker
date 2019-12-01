import React, { Component } from 'react';
import axios from 'axios';
import User from '../../../components/User/User';

class Users extends Component {
  state = {
    users: [],
    usersLoaded: false
  }

  componentDidMount() {
    axios.get('/users')
      .then(response => {
        this.setState({ users: response.data, usersLoaded: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let users = <div><p style={{ textAlign: 'center' }}>Loading...</p></div>;
    if (this.state.usersLoaded) {
       users = 
        <div className="row text-center" styles={{display: "flex", flexWrap: "wrap"}}>
          {this.state.users.map(user => 
            (
              <User
                key={user._id}
                id={user._id}
                name={user.name}
                username={user.username}
                email={user.email}/>
                )
          )}
        </div>
    }
    return users;
  }
}

export default Users;