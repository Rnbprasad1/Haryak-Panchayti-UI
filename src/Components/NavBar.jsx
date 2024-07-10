import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const StyledNavbar = styled.nav`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  background-color: #f8f9fa;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease-in-out;

  &.scrolled {
    padding: 4px 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #f1f3f5;
  }

  .navbar-brand {
    font-weight: 700;
    color: #2c3e50;
    font-size: 22px;
    transition: all 0.3s ease;
    .small {
      font-size: 12px;
      color: #6c757d;
      display: block;
      margin-top: -5px;
    }
  }

  .nav-link {
    font-weight: 600;
    color: #495057;
    margin: 0 8px;
    padding: 6px 12px;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover, &.active {
      color: #007bff;
      background-color: rgba(0, 123, 255, 0.1);
    }
  }

  .navbar-toggler {
    border: none;
    &:focus {
      box-shadow: none;
    }
  }

  @media (max-width: 991px) {
    .navbar-nav {
      padding-top: 0.5rem;
    }
    .nav-link {
      padding: 10px 12px;
    }
  }
`;

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleNavToggle = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <StyledNavbar className={`navbar navbar-expand-lg ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <NavLink className="navbar-brand" to="/" onClick={closeNav}>
          Guntur MP <span className="small">Helpdesk</span>
        </NavLink>
        <button className="navbar-toggler" type="button" onClick={handleNavToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
          <div className="navbar-nav ms-auto">
            <NavLink exact className="nav-item nav-link" to="/" activeClassName="active" onClick={closeNav}>Home</NavLink>
            <NavLink className="nav-item nav-link" to="/status" activeClassName="active" onClick={closeNav}>Status</NavLink>
            <NavLink className="nav-item nav-link" to="/query" activeClassName="active" onClick={closeNav}>Query</NavLink>
            <NavLink className="nav-item nav-link" to="/login" activeClassName="active" onClick={closeNav}>Login</NavLink>
            <NavLink className="nav-item nav-link" to="/admin" activeClassName="active" onClick={closeNav}>Admin</NavLink>
          </div>
        </div>
      </div>
    </StyledNavbar>
  );
}

export default Navbar;