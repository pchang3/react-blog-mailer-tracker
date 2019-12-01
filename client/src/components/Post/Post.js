import React from 'react';
import { Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const post = (props) => {
  let style = {
    margin: '10px'
  }
  let status = null;
  if(props.status) {
    if(props.status === 'Read') {
      status = <Alert variant="success">Read</Alert>;
    } else {
      status = <Alert variant="danger">Not Read</Alert>;
    }
  }
  return (
    <div className="col-lg-3 col-md-4 col-sm-6" style={{display: "flex"}}>
      <div className="card" style={style}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.author}</h6>
          <p className="card-text">
            {props.body.substring(0,75) + ' ...'}
          </p>
          <NavLink className="btn btn-primary" to={'/posts/' + props.id}>
            Read More
          </NavLink>
          {status}
        </div>
      </div>
    </div>
  )
}

export default post;
