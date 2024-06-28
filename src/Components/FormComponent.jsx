import React from 'react';
import { Navigate } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '280px',
    height: '350px',
    backgroundColor: '#FFF',
    margin: '0',
    boxShadow: '-1px 0px 25px 0px #21719369',
    padding: '2.25em',
    boxSizing: 'border-box',
    border: 'solid 1px #DDD',
    borderRadius: '0.5em',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    margin: '2em',
    marginTop: '-7em'
   
  },
  group: {
    marginBottom: '2em'
  },
  label: {
    margin: '0 0 10px',
    display: 'block',
    fontSize: '1.25em',
    color: '#217093',
    fontWeight: 600,
    fontFamily: 'inherit'
  },
  input: {
    padding: '0.3em 0.5em 0.4em',
    backgroundColor: '#f3fafd',
    border: 'solid 2px #217093',
    borderRadius: '4px',
    boxSizing: 'border-box',
    width: '100%',
    height: '50px',
    fontSize: '1.3em',
    color: '#353538',
    fontWeight: 600,
    fontFamily: 'inherit',
    transition: 'box-shadow 0.2s linear, border-color 0.25s ease-out'
  },
  inputFocus: {
    outline: 'none',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#edf8fc',
    border: 'solid 2px #4eb8dd'
  },
  placeholder: {
    color: '#21719383'
  },
  button: {
    margin: '0',
    padding: '0.5em',
    backgroundColor: '#4eb8dd',
    border: 'none',
    borderRadius: '4px',
    boxSizing: 'border-box',
    boxShadow: 'none',
    width: '100%',
    height: '50px',
    fontSize: '1.4em',
    color: '#FFF',
    fontWeight: 600,
    fontFamily: 'inherit',
    transition: 'transform 0.1s ease-in-out, background-color 0.2s ease-out'
  },
  buttonHover: {
    cursor: 'pointer',
    backgroundColor: '#217093'
  },
  buttonActive: {
    transform: 'scale(0.98)'
  }
};

class FormComponent extends React.Component {
  state = {
    isInputFocused: false,
    isButtonHovered: false,
    isButtonActive: false,
    email: '',
    password: '',
    isAuthenticated: false
  };

  handleInputFocus = () => {
    this.setState({ isInputFocused: true });
  };

  handleInputBlur = () => {
    this.setState({ isInputFocused: false });
  };

  handleButtonMouseEnter = () => {
    this.setState({ isButtonHovered: true });
  };

  handleButtonMouseLeave = () => {
    this.setState({ isButtonHovered: false });
  };

  handleButtonMouseDown = () => {
    this.setState({ isButtonActive: true });
  };

  handleButtonMouseUp = () => {
    this.setState({ isButtonActive: false });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    if (
      (email === 'CM' && password === 'cm1') ||
      (email === 'IAS' && password === 'ias1') ||
      (email === 'MRO' && password === 'mro1')
    ) {
      this.setState({ isAuthenticated: true });
    } else {
      alert('Invalid credentials');
    }
  };

  render() {
    const {
      isInputFocused,
      isButtonHovered,
      isButtonActive,
      isAuthenticated,
      email
    } = this.state;


if (isAuthenticated) {
  if (email === 'CM') {
    return <Navigate to="/cm" />;
  } else if (email === 'IAS') {
    return <Navigate to="/ias" />;
  } else if (email === 'MRO') {
    return <Navigate to="/mro" />;
  }
  return null;
}
return (
      <div style={styles.container}>
        <form style={styles.form}>
          <div style={styles.group}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              placeholder="abc@email.com"
              id="email"
              type="email"
              style={{
                ...styles.input,
                ...(isInputFocused && styles.inputFocus)
              }}
              onFocus={this.handleInputFocus}
              onBlur={this.handleInputBlur}
              onChange={this.handleInputChange}
            />
          </div>
          <div style={styles.group}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              style={{
                ...styles.input,
                ...(isInputFocused && styles.inputFocus)
              }}
              onFocus={this.handleInputFocus}
              onBlur={this.handleInputBlur}
              onChange={this.handleInputChange}
            />
          </div>
          <div style={styles.group}>
            <button
              type="button"
              style={{
                ...styles.button,
                ...(isButtonHovered && styles.buttonHover),
                ...(isButtonActive && styles.buttonActive)
              }}
              onMouseEnter={this.handleButtonMouseEnter}
              onMouseLeave={this.handleButtonMouseLeave}
              onMouseDown={this.handleButtonMouseDown}
              onMouseUp={this.handleButtonMouseUp}
              onClick={this.handleLogin}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default FormComponent;