import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/"> </NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ms-auto">
          <NavLink className="nav-item nav-link" exact to="/">Home</NavLink>
          <NavLink className="nav-item nav-link" to="/status">Status</NavLink>
          <NavLink className="nav-item nav-link" to="/query">Query</NavLink>
          <NavLink className="nav-item nav-link" to="/admin">Login</NavLink>  
          <NavLink className="nav-item nav-link" to="/dashboard">Dashboard</NavLink>  
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
