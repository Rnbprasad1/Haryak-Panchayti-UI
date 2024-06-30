import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Home</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ms-auto">
          <NavLink className="nav-item nav-link" exact to="/">Home</NavLink>
          <NavLink className="nav-item nav-link" to="/status">Status</NavLink>
          <NavLink className="nav-item nav-link" to="/query">Query</NavLink>
          <NavLink className="nav-item nav-link" to="/dashboard">Dashboard</NavLink> {/* Move Dashboard link here */}
          <div className="nav-item dropdown">
            <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Admin
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink className="dropdown-item" to="/mro">MRO</NavLink>
              <NavLink className="dropdown-item" to="/ias">IAS</NavLink>
              <NavLink className="dropdown-item" to="/cm">CM</NavLink>
            </div>
          </div>
          <NavLink className="nav-item nav-link" to="/admin">Login</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
