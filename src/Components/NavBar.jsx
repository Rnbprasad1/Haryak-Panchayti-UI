import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
//nav bar
function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" onClick={closeNav}></NavLink>
        <button className="navbar-toggler" type="button" onClick={handleNavToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <NavLink exact className="nav-item nav-link" to="/" activeClassName="active" onClick={closeNav}>Home</NavLink>
            <NavLink className="nav-item nav-link" to="/status" activeClassName="active" onClick={closeNav}>Status</NavLink>
            <NavLink className="nav-item nav-link" to="/query" activeClassName="active" onClick={closeNav}>Query</NavLink>
            <NavLink className="nav-item nav-link" to="/admin" activeClassName="active" onClick={closeNav}>Login</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
