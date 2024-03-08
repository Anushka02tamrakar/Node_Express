import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';

function Formuser({ newUser, setNewUser, createUser }) {


  return (
    <Form style={{ margin: '4em auto', textAlign: 'center', width: '50rem', marginBottom: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Add User</h1>
      <Row>
        <Form.Label column lg={2}>
          First Name :
        </Form.Label>
        <Col>
          <Form.Control type="text" placeholder="john" value={newUser.firstName}
          onInput={(e) => setNewUser({
            ...newUser,
            firstName: e.target.value
        })}  />
        </Col>
      </Row>

      <br />
      <Row>
        <Form.Label column lg={2}>
          Last Name :
        </Form.Label>
        <Col>
          <Form.Control type="text" placeholder="Doe" value={newUser.lastName} 
          onInput={(e) => setNewUser({
            ...newUser,
            lastName: e.target.value
        })} />
        </Col>
      </Row>
      <br />
      <Row>
        <Form.Label column lg={2}>
          Email :
        </Form.Label>
        <Col>
          <Form.Control type="text" placeholder="xyz@gmail.com" value={newUser.email} 
          onInput={(e) => setNewUser({
            ...newUser,
            email: e.target.value
        })} />
        </Col>
      </Row>
      <br />
      <Row>
        <Form.Label column lg={2}>
          Avatar URL :
        </Form.Label>
        <Col>
          <Form.Control type="text" placeholder="URL" value={newUser.avatar} 
          onInput={(e) => setNewUser({
            ...newUser,
            avatar: e.target.value
        })} />
        </Col>
      </Row>
      <br />
      <Button variant='dark' type="submit" onClick={createUser}>Connect</Button>
    </Form>
  );
}

export default Formuser;