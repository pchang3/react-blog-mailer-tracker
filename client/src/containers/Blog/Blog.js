import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import './Blog.css';

import { Navbar, Nav } from 'react-bootstrap';
import Posts from './Posts/Posts';
import Users from './Users/Users';
import NewPost from './NewPost/NewPost';
import EditPost from './EditPost/EditPost';
import FullPost from './FullPost/FullPost';
import UserDetail from "./Users/UserDetail/UserDetail";

class Blog extends Component {
  
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand>Blog-mailer</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end">
              <LinkContainer to="/posts" exact>
                <Nav.Link>Articles</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/posts/new">
                <Nav.Link>New Post</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/users">
                <Nav.Link>Users</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/users/:id" component={UserDetail} />
          <Route path="/users" component={Users} />
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/:id/edit" component={EditPost} />
          <Route path="/posts/:id" component={FullPost} />
          <Route path="/posts" component={Posts} />
          <Route path="/" render={() => <Redirect to="/posts" />} />
        </Switch>
      </div>
        );
    }
}

export default Blog;

