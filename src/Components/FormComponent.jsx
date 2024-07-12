import React from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 320px;
  background-color: #FFF;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 2.5em;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h2`
  color: #217093;
  margin-bottom: 1.5em;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5em;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5em;
  color: #217093;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8em;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #4eb8dd;
    box-shadow: 0 0 0 2px rgba(78, 184, 221, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8em;
  background-color: #4eb8dd;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #217093;
  }

  &:active {
    transform: scale(0.98);
  }
`;

class FormComponent extends React.Component {
  state = {
    email: '',
    password: '',
    isAuthenticated: false,
    role: '',
    loggedInMandal: ''
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

 
  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const mandals = [
      'Chebrole', 'Duggirala', 'Guntur', 'Kakumanu', 'Kollipara', 'Mangalagiri',
      'Medikonduru', 'Pedakakani', 'Pedanandipadu', 'Phirangipuram', 'Ponnur',
      'Prathipadu', 'Tadepalli', 'Tadikonda', 'Tenali', 'Thullur', 'Vatticherukuru',
    ];
    if (email === 'CM' && password === 'cm1') {
      this.setState({ isAuthenticated: true, role: 'CM' });
    } else if (email === 'IAS' && password === 'ias1') {
      this.setState({ isAuthenticated: true, role: 'IAS' });
    } else {
      const mandal = mandals.find(m => m.toLowerCase() === email.toLowerCase());
      if (mandal && password === `${mandal.substring(0, 3).toLowerCase()}@1`) {
        this.setState({ isAuthenticated: true, role: 'MRO', loggedInMandal: mandal });
      } else {
        alert('Invalid credentials');
      }
    }
  };

  render() {
    const { isAuthenticated, role, loggedInMandal } = this.state;

    if (isAuthenticated) {
      if (role === 'CM') return <Navigate to="/cm" />;
      if (role === 'IAS') return <Navigate to="/ias" />;
      if (role === 'MRO') return <Navigate to={`/mro/${loggedInMandal}`} state={{ loggedInMandal }}/>;
      return null;
    }

    return (
      <Container>
        <Form onSubmit={this.handleLogin}>
          <Title>Login</Title>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="Enter your email"
              onChange={this.handleInputChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={this.handleInputChange}
              required
            />
          </InputGroup>
          <Button type="submit">Log in</Button>
        </Form>
      </Container>
    );
  }
}

export default FormComponent;