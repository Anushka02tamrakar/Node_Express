import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';

function Users({user}) {
  return (
    <Card style={{ width: '18rem', marginTop: '10px' }}>
      <Card.Img variant="top" src={user.avatar} />
      <Card.Body>
        <Card.Title>{user.firstName} {user.lastName}</Card.Title>
        <Card.Text>
        {user.email}
        </Card.Text>
        <Button variant="dark">Connect</Button>
      </Card.Body>
    </Card>
  );s
}

export default Users;