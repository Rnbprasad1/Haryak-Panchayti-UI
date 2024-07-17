import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, InputGroup, Alert } from 'react-bootstrap';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { DataContext } from './AdminComponents/DataContext';

const FormComponent = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { villagePasswords } = useContext(DataContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

const handleLogin = (e) => {
  e.preventDefault();
  const { username, password } = credentials;
  const villagePasswords = JSON.parse(localStorage.getItem('villageCredentials')) || {};

  if (username === 'CM' && password === 'cm1') {
    navigate('/cm');
  } else if (username === 'IAS' && password === 'ias1') {
    navigate('/ias');
  } else if (username === 'admin' && password === 'admin123') {
    navigate('/admin');
  } else {
    const village = Object.keys(villagePasswords).find(
      (village) => villagePasswords[village].username === username && villagePasswords[village].password === password
    );
    if (village) {
navigate(`/mro/${username}/${encodeURIComponent(Object.keys(villagePasswords).filter(v => villagePasswords[v].username === username).join(','))}`);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  }
};

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4">
                <FaSignInAlt className="me-2" />
                Secure Login
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-primary text-white">
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control 
                      type="text" 
                      name="username"
                      placeholder="Enter your username"
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="password" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-primary text-white">
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control 
                      type="password" 
                      name="password"
                      placeholder="Enter your password"
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2">
                  <FaSignInAlt className="me-2" />
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormComponent;