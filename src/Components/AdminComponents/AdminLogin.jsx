import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import CMIASAdmin from './CMIASAdmin';
import MROAdmin from './MROAdmin';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin' && password === 'CM@123') {
      setRole('CM/IAS');
      setError('');
    } else if (email === 'admin' && password === 'IAS@123') {
      setRole('CM/IAS');
      setError('');
    } else if (email === 'admin' && password === 'MRO@123') {
      setRole('MRO');
      setError('');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container>
      {role === '' ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="USER_NAME"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      ) : role === 'CM/IAS' ? (
        <CMIASAdmin />
      ) : (
        <MROAdmin />
      )}
    </Container>
  );
};

export default AdminLogin;
