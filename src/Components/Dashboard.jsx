import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table, Dropdown, Navbar, Nav, Card, InputGroup} from 'react-bootstrap';
import { FaSearch, FaSignOutAlt, FaUser, FaLock  } from 'react-icons/fa';



const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mandals, setMandals] = useState([]);
  const [selectedMandal, setSelectedMandal] = useState('');
  const [filteredMandals, setFilteredMandals] = useState([]);

  useEffect(() => {
    const fetchMandals = async () => {
      const mandalData = [
         'Adilabad','Asifabad','Chennur','Kagaznagar','Mancherial','Mandamarri','Aswaraopeta','Bhadrachalam','Charla',
         'Cherla','Dammapeta','Dummugudem','Gundala','Karakagudem','Kerameri','Kagaznagar','Sirpur (T)','Wankidi','Nirmal',
         'Tiryani','Rebbena','Badradrikothagudem','Burgampahad'
          
      ];
      setMandals(mandalData);
      setFilteredMandals(mandalData);
    };

    fetchMandals();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSelectedMandal(searchTerm);
    const filtered = mandals.filter(mandal => 
      mandal.toLowerCase().includes(searchTerm)
    );
    setFilteredMandals(filtered);
  };

  const handleMandalSelect = (mandal) => {
    setSelectedMandal(mandal);
    setFilteredMandals([mandal]);
  };

  const generatePassword = (mandalName) => {
    return `${mandalName.substring(0, 3).toLowerCase()}@1`;
  };

  if (!isLoggedIn) {
    return (
       <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
  <Row className="w-100">
    <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
      <Card className="shadow-lg border-0">
        <Card.Body className="p-5">
          <h2 className="text-center mb-4">Admin Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control 
                  type="text" 
                  placeholder="Enter username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
                <Form.Control 
                  type="password" 
                  placeholder="Enter password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
    );
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button variant="outline-light" onClick={handleLogout}>
                <FaSignOutAlt className="me-2" />
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Search Mandal</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <Form.Control 
                  type="text" 
                  placeholder="Search mandal" 
                  value={selectedMandal}
                  onChange={handleSearch}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover responsive className="shadow-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Mandal Name (Username)</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {filteredMandals.map((mandal, index) => (
                  <tr key={index}>
                    <td>{mandal}</td>
                    <td>{generatePassword(mandal)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;