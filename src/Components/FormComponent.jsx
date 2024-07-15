import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, InputGroup, Alert } from 'react-bootstrap';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

const FormComponent = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [authState, setAuthState] = useState({ isAuthenticated: false, role: '', loggedInMandal: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    const mandals = [
      'Chebrole', 'Duggirala', 'Guntur', 'Kakumanu', 'Kollipara', 'Mangalagiri',
      'Medikonduru', 'Pedakakani', 'Pedanandipadu', 'Phirangipuram', 'Ponnur',
      'Prathipadu', 'Tadepalli', 'Tadikonda', 'Tenali', 'Thullur', 'Vatticherukuru',
    ];

    if (email === 'CM' && password === 'cm1') {
      setAuthState({ isAuthenticated: true, role: 'CM' });
    } else if (email === 'IAS' && password === 'ias1') {
      setAuthState({ isAuthenticated: true, role: 'IAS' });
    } else {
      const mandal = mandals.find(m => m.toLowerCase() === email.toLowerCase());
      if (mandal && password === `${mandal.substring(0, 3).toLowerCase()}@1`) {
        setAuthState({ isAuthenticated: true, role: 'MRO', loggedInMandal: mandal });
      } else {
        setError('Invalid credentials. Please try again.');
      }
    }
  };

  if (authState.isAuthenticated) {
    if (authState.role === 'CM') return <Navigate to="/cm" />;
    if (authState.role === 'IAS') return <Navigate to="/ias" />;
    if (authState.role === 'MRO') return <Navigate to={`/mro/${authState.loggedInMandal}`} state={{ loggedInMandal: authState.loggedInMandal }}/>;
  }

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
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-primary text-white">
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control 
                      type="text" 
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