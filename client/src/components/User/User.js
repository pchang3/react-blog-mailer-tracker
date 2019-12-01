import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const user = (props) => {
  let style = {
    margin: '10px'
  }

  return (
    <div className="col-lg-3 col-md-4 col-sm-6" style={{display: "flex"}}>
      <Card style={style}>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Subtitle>{'ID: ' + props.username}</Card.Subtitle>
          <Card.Text>
            {props.email}
          </Card.Text>
          <NavLink to={'/users/' + props.id}>
            <Button variant="primary">More Info</Button>
          </NavLink>
        </Card.Body>
      </Card>
    </div>
  )
}

export default user;