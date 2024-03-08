import { useEffect, useState } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbarcompo from './components/Navbarcompo';
import Users from './components/Users';
import { Container, Row, Col } from 'react-bootstrap';
import Formuser from './components/Formuser';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatar: ''
  });

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = () => {
    axios
      .get('http://localhost:4000/users')
      .then((res) => setUsers(res.data.data))
      .catch((error) => console.log(error))
  }


  const createUser = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:4000/users', newUser)
      .then((res) => fetchUsers())
      .catch((error) => console.log(error))
  }


  return (
    <div className='app'>
      <Navbarcompo />
      <Container>
        <Row>
          {users.map((user, index) =>
            <Col md={4} key={index}>
              <Users user={user} />
            </Col>
          )}

        </Row>
        <Formuser newUser={newUser} setNewUser={setNewUser} createUser={createUser} />


      </Container>
    </div>
  )
}

export default App
