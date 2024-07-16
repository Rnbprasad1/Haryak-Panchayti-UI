import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table, Navbar, Nav, Card, InputGroup } from 'react-bootstrap';
import { FaSignOutAlt, FaUser, FaLock } from 'react-icons/fa';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [assemblies, setAssemblies] = useState([]);
  const [mandals, setMandals] = useState({});
  const [villages, setVillages] = useState({});
  const [selectedAssembly, setSelectedAssembly] = useState('Bhadrachalam');
  const [selectedMandal, setSelectedMandal] = useState('');
  const [selectedVillages, setSelectedVillages] = useState([]);
  const [filteredMandals, setFilteredMandals] = useState([]);
  const [filteredVillages, setFilteredVillages] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [villagePasswords, setVillagePasswords] = useState({});
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const assemblyData = ['Bhadrachalam'];
      const mandalData = {
        'Bhadrachalam': ['Bhadrachalam', 'Wazedu', 'Venkatapuram', 'Cherla', 'Dummugudem'],
      };
      const villageData = {
        'Bhadrachalam': ['Bandigumpu', 'Gannavaram', 'Bhadrachalam', 'Anantharam', 'Buggapadu', 'Cherukupalli'],
        'Wazedu': ['Arguntapalle', 'Arlagudem'],
        'Venkatapuram': ['A Kathigudem', 'Bandagudem'],
        'Cherla': ['Chalamala', 'Chimalapadu'],
        'Dummugudem': ['Achuthapuram', 'Bojjiguppa']
      };

      setAssemblies(assemblyData);
      setMandals(mandalData);
      setVillages(villageData);
      setFilteredMandals(mandalData['Bhadrachalam'] || []);

      // Load saved passwords from localStorage
      const savedPasswords = JSON.parse(localStorage.getItem('villagePasswords')) || {};
      setVillagePasswords(savedPasswords);
    };

    fetchData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
    } else if (villagePasswords[username]?.password === password) {
      setIsLoggedIn(true);
      setFilteredVillages([username]);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setSelectedVillages([]);
  };

  const handleAssemblyChange = (e) => {
    const assembly = e.target.value;
    setSelectedAssembly(assembly);
    setFilteredMandals(mandals[assembly] || []);
    setSelectedMandal('');
    setSelectedVillages([]);
    setFilteredVillages([]);
  };

  const handleMandalChange = (e) => {
    const mandal = e.target.value;
    setSelectedMandal(mandal);
    setFilteredVillages(villages[mandal] || []);
    setSelectedVillages([]);
  };

  const handleVillageChange = (e) => {
    const village = e.target.value;
    setSelectedVillages(prev => 
      prev.includes(village) ? prev.filter(v => v !== village) : [...prev, village]
    );
  };

 const handleCreatePasswords = () => {
  if (newUsername && newPassword) {
    const updatedPasswords = { ...villagePasswords };
    selectedVillages.forEach(village => {
      updatedPasswords[village] = { username: newUsername, password: newPassword };
    });
    setVillagePasswords(updatedPasswords);
    // Save to localStorage
    localStorage.setItem('villagePasswords', JSON.stringify(updatedPasswords));
    setNewUsername('');
    setNewPassword('');
    alert('Username and Password created successfully!');
  } else {
    alert('Please enter a username and password.');
  }
};

  if (!isLoggedIn) {
    return (
      <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <Row className="w-100">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4">Login</h2>
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
          <Navbar.Brand>Dashboard</Navbar.Brand>
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
          <Col md={4}>
            <Form.Group>
              <Form.Label>Select Assembly</Form.Label>
              <Form.Control as="select" value={selectedAssembly} onChange={handleAssemblyChange}>
                <option value="">Select Assembly</option>
                {assemblies.map((assembly, index) => (
                  <option key={index} value={assembly}>{assembly}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Select Mandal</Form.Label>
              <Form.Control as="select" value={selectedMandal} onChange={handleMandalChange} disabled={!selectedAssembly}>
                <option value="">Select Mandal</option>
                {filteredMandals.map((mandal, index) => (
                  <option key={index} value={mandal}>{mandal}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Select Villages</Form.Label>
              <Form.Control as="select" multiple value={selectedVillages} onChange={handleVillageChange} disabled={!selectedMandal}>
                {filteredVillages.map((village, index) => (
                  <option key={index} value={village}>{village}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label>New Username for Selected Villages</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter new username" 
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>New Password for Selected Villages</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter new password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6} className="d-flex align-items-end">
            <Button variant="primary" onClick={handleCreatePasswords}>
              Create Username and Password for Selected Villages
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover responsive className="shadow-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Village</th>
                  <th>Username</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(villagePasswords).map(([village, data]) => (
                  <tr key={village}>
                    <td>{village}</td>
                    <td>{data.username}</td>
                    <td>{data.password}</td>
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
