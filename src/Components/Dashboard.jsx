import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, InputGroup, Dropdown, Table } from 'react-bootstrap';
import { FaUser, FaLock, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [villagePasswords, setVillagePasswords] = useState({});
  const [assemblies] = useState(['Bhadrachalam']);
  const [selectedAssembly, setSelectedAssembly] = useState('');
  const [selectedMandal, setSelectedMandal] = useState('');
  const [villages, setVillages] = useState([]);
  const [selectedVillages, setSelectedVillages] = useState([]);
  const [villageCredentials, setVillageCredentials] = useState({});
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [mandalVillages] = useState({
    'Bhadrachalam': ['Bhadrachalam', 'Anantharam', 'Bangaru Chelaka', 'Bhoopalapatnam', 'Buggapadu', 'Cherukupalli', 'Cheruvumadharam', 'Gottimukkala', 'Gundala', 'Kannaigudem', 'Kondrajupeta', 'Maddulapalli', 'Manuguru', 'Marepalli', 'Nagineniprolu', 'Peddamidisileru', 'Ramachandrapuram', 'Ramanujavaram', 'Sarvaram', 'Sarvapuram'],
    'Wazedu': ['Cherukur', 'Chintoor', 'Edjarlapalli', 'Gummadidoddi', 'Kongala', 'Krishnapuram', 'Murmur', 'Nagaram', 'Peruru', 'Wazedu', 'Chandrupatla', 'Lingapeta', 'China Gangaram', 'Tekulagudem'],
    'Venkatapuram': ['Alubaka [G]', 'Alubaka [Z]', 'Ankannagudem', 'Bandagudem', 'Barlagudem', 'Bodapuram [G]', 'Chalamala', 'Chinagangaram', 'Chirtapalle', 'Doli', 'Edhira [G]', 'Ippagudem', 'Ippapuram [G]', 'K.Kondapuram [Z]', 'Kalipaka [G]', 'Kondapuram [Z]', 'Koyabestagudem', 'Mahitapuram', 'Mallapuram', 'Marikala', 'Morram Vanigudem [G]', 'Nuguru', 'Ontichintalagudem [G]', 'Palem', 'Pamunoor', 'Pujarigudem [Z]', 'Rachapalle', 'Ramavaram', 'Sudibaka', 'Suraveedu [G]', 'Suraveedu [Z]', 'Tadapala', 'Uppedu', 'Uppedu Veerapuram', 'Veerabhadraram', 'Venkatapuram', 'Wadagudem', 'Zella'],
    'Cherla': ['Charla', 'Allapalli', 'Ankampalem', 'Bheemavaram', 'Chatti', 'Gollagudem', 'Gundlamadugu', 'Indupriyal', 'Kondamodalu', 'Kothapalli', 'Lankapalli', 'Mallampeta', 'Manuguru', 'Marepalli', 'Nellipaka', 'Pusugudem', 'Sarivela', 'Sarvapuram', 'Timmakkapet', 'Velagapadu'],
    'Dummugudem': ['Dummugudem', 'Cherla', 'Narasapuram', 'Gubbagurthi', 'Gottimukkala', 'Mothugudem', 'Pusugudem', 'Vaddigudem', 'Rajapuram', 'Tekulapalli', 'Venkatapuram', 'Chintoor', 'Kuturu', 'Edurallapalli', 'Bhadrachalam', 'Karagudem', 'Dornakal', 'Vepalagadda', 'Kothagudem', 'Yellandu']
  });

  const mandals = Object.keys(mandalVillages);

  const handleMandalChange = (e) => {
    const selectedMandal = e.target.value;
    setSelectedMandal(selectedMandal);
    setVillages(mandalVillages[selectedMandal] || []);
    setSelectedVillages([]);
  };

  useEffect(() => {
    const savedPasswords = JSON.parse(localStorage.getItem('villagePasswords')) || {};
    setVillagePasswords(savedPasswords);
    const savedCredentials = JSON.parse(localStorage.getItem('villageCredentials')) || {};
    setVillageCredentials(savedCredentials);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
    } else if (villagePasswords[username]?.password === password) {
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

  const handleVillageSelect = (village) => {
    setSelectedVillages(prevSelected => 
      prevSelected.includes(village)
        ? prevSelected.filter(v => v !== village)
        : [...prevSelected, village]
    );
  };

  const handleCreateCredentials = () => {
    if (selectedVillages.length === 0) {
      alert('Please select at least one village');
      return;
    }
    if (!newUsername || !newPassword) {
      alert('Please enter both username and password');
      return;
    }
    const newCredentials = { ...villageCredentials };
    selectedVillages.forEach(village => {
      newCredentials[village] = { username: newUsername, password: newPassword };
    });
    setVillageCredentials(newCredentials);
    localStorage.setItem('villageCredentials', JSON.stringify(newCredentials));
    setNewUsername('');
    setNewPassword('');
    setSelectedVillages([]);
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
      <Container fluid>
        <Row className="mb-4 align-items-center">
          <Col>
            <h1>Admin Dashboard</h1>
          </Col>
          <Col xs="auto">
            <Button variant="outline-danger" onClick={handleLogout}>
              <FaSignOutAlt className="me-2" />
              Logout
            </Button>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col xs={12} md={4} className="mb-3">
              <Form.Group controlId="formAssembly">
                <Form.Label>Assembly</Form.Label>
                <Form.Control 
                  as="select"
                  value={selectedAssembly}
                  onChange={(e) => setSelectedAssembly(e.target.value)}
                >
                  <option value="">Select Assembly</option>
                  {assemblies.map((assembly, index) => (
                    <option key={index} value={assembly}>{assembly}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={4} className="mb-3">
              <Form.Group controlId="formMandal">
                <Form.Label>Mandal</Form.Label>
                <Form.Control 
                  as="select"
                  value={selectedMandal}
                  onChange={handleMandalChange}
                >
                  <option value="">Select Mandal</option>
                  {Object.keys(mandalVillages).map((mandal, index) => (
                    <option key={index} value={mandal}>{mandal}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={4} className="mb-3">
  <Form.Group controlId="formVillages">
    <Form.Label>Villages</Form.Label>
    <Dropdown onToggle={(isOpen) => {
      if (!isOpen) {
        // This will close the dropdown when clicking outside
        document.body.click();
      }
    }}>
      <Dropdown.Toggle variant="secondary" id="dropdown-villages" className="w-100">
        Select Villages
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100">
        {villages.map((village, index) => (
          <Dropdown.Item 
            key={index} 
            as="button" 
            onClick={(e) => {
              e.stopPropagation(); // Prevent dropdown from closing on item click
              handleVillageSelect(village);
            }}
          >
            <Form.Check
              type="checkbox"
              id={`village-${index}`}
              label={village}
              checked={selectedVillages.includes(village)}
              onChange={() => {}}
            />
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  </Form.Group>
</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={4}>
              <Form.Group controlId="formNewUsername">
                <Form.Label>New Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="formNewPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4} className="d-flex align-items-end">
              <Button variant="primary" onClick={handleCreateCredentials} className="w-100">
                Create Credentials
              </Button>
            </Col>
          </Row>
        </Form>
  
        <h2 className="mt-4 mb-3">Village Credentials</h2>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Village</th>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(villageCredentials).map(([village, creds]) => (
                <tr key={village}>
                  <td>{village}</td>
                  <td>{creds.username}</td>
                  <td>{creds.password}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    );
  };
  
  export default AdminDashboard;
  