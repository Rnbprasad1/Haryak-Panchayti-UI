import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, InputGroup, Dropdown, Table, Modal } from 'react-bootstrap';
import { FaUser, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [villagePasswords, setVillagePasswords] = useState({});
  const [assemblies] = useState(['Bhadrachalam']);
  const [selectedAssembly, setSelectedAssembly] = useState('Bhadrachalam');
  const [selectedMandal, setSelectedMandal] = useState('');
  const [villages, setVillages] = useState([]);
  const [selectedVillages, setSelectedVillages] = useState([]);
  const [villageCredentials, setVillageCredentials] = useState({});
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [mandalCredentials, setMandalCredentials] = useState({});
  const [newMandalUsername, setNewMandalUsername] = useState('');
  const [newMandalPassword, setNewMandalPassword] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingCredential, setEditingCredential] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [mandalVillages] = useState({
    'Addanki': ['Addanki North', 'Addanki South', 'Bommanampadu', 'Chakraya Palem', 'Chinakotha Palle', 'Dharmavaram', 'Dhenuva Konda', 'Gopalapuram', 'Kalavakuru', 'Kotikalapudi', 'Kunkupadu', 'Mani Keswaram', 'Modepalle', 'Mylavaram', 'Nannurupadu', 'Ramayapalem', 'Uppalapadu', 'Vemparala', 'Thimmayapalem'],
    'Bapatla': ['Adivi', 'Appikatla', 'Bapatla East', 'Bapatla West', 'Bharthipudi', 'Cheruvu', 'Etheru', 'Gopapuram', 'Gudipudi', 'Jammulapalem', 'Jillellamudi', 'Kankatapalem', 'Maruproluvaripalem', 'Mulapalem', 'Murukondapadu', 'Narasayapalem', 'Neredupalle', 'Poondla',],
    'Karlapalem': ['Buddam', 'Ganapavaram', 'Karlapalem', 'Perali', 'Yazali'],
    'Martur': ['Bobbe Palle', 'Bolla Palle', 'Darsiagraharam', 'Dronadula', 'Jangamaheswarapuram', 'Jonna Thali Agraharam', 'Kolala Pudi', 'Konanki', 'Lakkavaram Agraharam', 'Martur', 'Nagaraju Palle', 'Rajupalem', 'Valaparla',],
    'Parchur': ['Adusumalle', 'Bodawadamandagunta', 'Chennubhotla Palem', 'Cherukuru', 'Devara Palle', 'Edubadu', 'Garnepudi', 'Gollapudi', 'Inagallu', 'Nuthalapadu', 'Parchur', 'Ramanayapalem', 'Upputur', 'Veeranna Palem'],
    'Pittalavanipalem': ['Allur', 'Chandole', 'Khajipalem', 'Komali', 'Pittalavanipalem', 'Sangupalem',],
    'Yeddanapudi': ['Ananthavaram', 'Enamadala', 'Gannavaram', 'Jagarlamudi', 'Poluru', 'Punuru', 'Vinjanampadu', 'Yeddanapudi'],
    'Ballikurava': ['Annavaram', 'Chinamakkena', 'Ballikurava', 'Madduluru', 'Muppavaram', 'Vemavaram', 'Poluru', 'Tammavaram', 'Arumbaka', 'Inumella', 'Mellavagu', 'Nallapadu', 'Pedamakkena', 'Rudravaram', 'Tangedu', 'Venkatadripalem'],
    'Chinaganjam': ['Ainavolu', 'Bheeramvaripalem', 'Chinthagunta', 'Gajulapalem', 'Kothapalle', 'Marripudi', 'Nagulapadu', 'Pathepuram', 'Prathipadu', 'Ravipadu'],
    'Chirala': ['Chennupalli', 'Epuru', 'Irlapadu', 'Jandrapeta', 'Kothapeta', 'Perala', 'Ramachandrapuram', 'Sanjeevaiahpalem', 'Singarayakonda'],
    'Inkollu': ['Chimakurthy', 'Darsi', 'Inkollu', 'Kandukur', 'Maddipadu', 'Santhanuthalapadu'],
    'J. Panguluru': ['Alavalapadu', 'Budavada', 'Bytamanjulur', 'Chandalur', 'Janakavaram Panguluru', 'Kasyapuram', 'Konda Manjulur', 'Kondamur', 'Kotapadu', 'Muppavaram', 'Nuzendla Palle', 'Ramakuru', 'Reningavaram', 'Thurpu Koppera Padu', 'Thurpu Thakkella Padu'],
    'Karamchedu': ['Adivi', 'Appikatla', 'Bapatla East', 'Bapatla West', 'Bharthipudi', 'Cheruvu', 'Etheru', 'Gopapuram', 'Gudipudi', 'Jammulapalem', 'Jillellamudi', 'Kankatapalem', 'Maruproluvaripalem', 'Mulapalem', 'Murukondapadu'],
    'Korisapadu': ['Adavipalem', 'Bikshapathi Palle', 'Chiluvur', 'Dollapadu', 'Goraganamudi', 'Kantipudi', 'Kollipara', 'Krishnapuram', 'Mogallur', 'Nallapadu', 'Peddaganjam', 'Thimmapuram'],
    'Santhamaguluru': ['Akkalapadu', 'Chandlavaripalem', 'Cheemakurthi', 'Kodur', 'Laxmipuram', 'Madhavaram', 'Manchikalapadu', 'Nidamanuru', 'Pedanandipadu', 'Peddaganjam', 'Santhamaguluru', 'Vadlamudi', 'Yerragondapalem'],
    'Tsundur': ['Adivi', 'Bachina', 'Chandarlapadu', 'Gollapudi', 'Ippur', 'Kondapalli', 'Peddaganjam', 'Peddagudem', 'Reddigudem', 'Velivolu'],
    'Vemuru': ['Chintalapudi', 'Goribidanapadu', 'Jonnalagadda', 'Kothapalli', 'Maddipadu', 'Peddaganjam', 'Reddigudem', 'Sambepalle', 'Vemuru'],
    'Vetapalem': ['Ananthavaram', 'Gudur', 'Kankipadu', 'Kondapalli', 'Nallapadu', 'Penuganchiprolu', 'Peddaganjam', 'Sambepudi', 'Tadigadapa', 'Vadlamudi', 'Vikramasingapuram', 'Yacharam'],
    'Yeddanapudi': ['Enamadala', 'Gannavaram', 'Jagarlamudi', 'Poluru', 'Punuru', 'Vinjanampadu', 'Yeddanapudi']
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
    const savedMandalCredentials = JSON.parse(localStorage.getItem('mandalCredentials')) || {};
    setMandalCredentials(savedMandalCredentials);
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

  const handleCreateMandalCredentials = () => {
    if (!selectedMandal) {
      alert('Please select a mandal');
      return;
    }
    if (!newMandalUsername || !newMandalPassword) {
      alert('Please enter both username and password for the mandal');
      return;
    }
    const newCredentials = {
      ...mandalCredentials,
      [selectedMandal]: { username: newMandalUsername, password: newMandalPassword }
    };
    setMandalCredentials(newCredentials);
    localStorage.setItem('mandalCredentials', JSON.stringify(newCredentials));
    setNewMandalUsername('');
    setNewMandalPassword('');
  };

  const handleEditVillageCredentials = (village) => {
    setEditingCredential({ type: 'village', name: village });
    setEditUsername(villageCredentials[village].username);
    setEditPassword(villageCredentials[village].password);
    setShowEditPopup(true);
  };

  const handleDeleteVillageCredentials = (village) => {
    if (window.confirm(`Are you sure you want to delete credentials for ${village}?`)) {
      const updatedCredentials = { ...villageCredentials };
      delete updatedCredentials[village];
      setVillageCredentials(updatedCredentials);
      localStorage.setItem('villageCredentials', JSON.stringify(updatedCredentials));
    }
  };

  const handleEditMandalCredentials = (mandal) => {
    setEditingCredential({ type: 'mandal', name: mandal });
    setEditUsername(mandalCredentials[mandal].username);
    setEditPassword(mandalCredentials[mandal].password);
    setShowEditPopup(true);
  };

  const handleDeleteMandalCredentials = (mandal) => {
    if (window.confirm(`Are you sure you want to delete credentials for ${mandal}?`)) {
      const updatedCredentials = { ...mandalCredentials };
      delete updatedCredentials[mandal];
      setMandalCredentials(updatedCredentials);
      localStorage.setItem('mandalCredentials', JSON.stringify(updatedCredentials));
    }
  };

  const handleUpdateCredentials = () => {
    if (editingCredential.type === 'village') {
      const updatedCredentials = {
        ...villageCredentials,
        [editingCredential.name]: { username: editUsername, password: editPassword }
      };
      setVillageCredentials(updatedCredentials);
      localStorage.setItem('villageCredentials', JSON.stringify(updatedCredentials));
    } else {
      const updatedCredentials = {
        ...mandalCredentials,
        [editingCredential.name]: { username: editUsername, password: editPassword }
      };
      setMandalCredentials(updatedCredentials);
      localStorage.setItem('mandalCredentials', JSON.stringify(updatedCredentials));
    }
    setShowEditPopup(false);
    alert('Credentials updated successfully!');
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

                  <Button variant="primary" type="submit" className="w-100">
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
    <Container fluid className="bg-light min-vh-100 py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Admin Dashboard</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="text-end">
          <Button variant="danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Logout
          </Button>
        </Col>
      </Row>
      <Row>
      <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h3>Create Village Credentials</h3>
              <Form>
                <Form.Group controlId="formMandal" className="mb-3">
                  <Form.Label>Select Mandal</Form.Label>
                  <Form.Select value={selectedMandal} onChange={handleMandalChange}>
                    <option value="">Select a mandal</option>
                    {mandals.map((mandal) => (
                      <option key={mandal} value={mandal}>
                        {mandal}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formVillages" className="mb-3">
                  <Form.Label>Select Villages</Form.Label>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {villages.map((village) => (
                      <Form.Check
                        key={village}
                        type="checkbox"
                        id={`village-${village}`}
                        label={village}
                        checked={selectedVillages.includes(village)}
                        onChange={() => handleVillageSelect(village)}
                      />
                    ))}
                  </div>
                </Form.Group>
                <Form.Group controlId="formNewUsername" className="mb-3">
                  <Form.Label>New Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter new username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formNewPassword" className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleCreateCredentials}>
                  Create Credentials
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h3>Create Mandal Credentials</h3>
              <Form>
                <Form.Group controlId="formMandalCredential" className="mb-3">
                  <Form.Label>Select Mandal</Form.Label>
                  <Form.Select value={selectedMandal} onChange={handleMandalChange}>
                    <option value="">Select a mandal</option>
                    {mandals.map((mandal) => (
                      <option key={mandal} value={mandal}>
                        {mandal}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formNewMandalUsername" className="mb-3">
                  <Form.Label>New Mandal Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter new mandal username"
                    value={newMandalUsername}
                    onChange={(e) => setNewMandalUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formNewMandalPassword" className="mb-3">
                  <Form.Label>New Mandal Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new mandal password"
                    value={newMandalPassword}
                    onChange={(e) => setNewMandalPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleCreateMandalCredentials}>
                  Create Mandal Credentials
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    <Row>
  <Col>
    <Card>
      <Card.Body>
        <h3>Village Credentials</h3>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Village</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(villageCredentials).map(([village, cred]) => (
                <tr key={village}>
                  <td>{village}</td>
                  <td>{cred.username}</td>
                  <td>{cred.password}</td>
                  <td>
                    <Button variant="primary" size="sm" className="me-2 mb-1" onClick={() => handleEditVillageCredentials(village)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteVillageCredentials(village)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  </Col>
</Row>
<Row className="mt-4">
  <Col>
    <Card>
      <Card.Body>
        <h3>Mandal Credentials</h3>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Mandal</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(mandalCredentials).map(([mandal, cred]) => (
                <tr key={mandal}>
                  <td>{mandal}</td>
                  <td>{cred.username}</td>
                  <td>{cred.password}</td>
                  <td>
                    <Button variant="primary" size="sm" className="me-2 mb-1" onClick={() => handleEditMandalCredentials(mandal)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteMandalCredentials(mandal)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  </Col>
</Row>
<Modal show={showEditPopup} onHide={() => setShowEditPopup(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Credentials</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={editUsername}
          onChange={(e) => setEditUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
  <Form.Label>Password</Form.Label>
  <InputGroup>
    <Form.Control
      type={showPassword ? "text" : "password"}
      value={editPassword}
      onChange={(e) => setEditPassword(e.target.value)}
    />
    <Button
      variant="outline-secondary"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </Button>
  </InputGroup>
</Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowEditPopup(false)}>
      Cancel
    </Button>
    <Button variant="warning" onClick={() => {
      setEditUsername(editingCredential.type === 'village' ? villageCredentials[editingCredential.name].username : mandalCredentials[editingCredential.name].username);
      setEditPassword(editingCredential.type === 'village' ? villageCredentials[editingCredential.name].password : mandalCredentials[editingCredential.name].password);
    }}>
      Reset
    </Button>
    <Button variant="primary" onClick={handleUpdateCredentials}>
      Update
    </Button>
  </Modal.Footer>
</Modal>
    </Container>
  );
};

export default AdminDashboard;

