// src/Navbar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/"></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ms-auto">
          <Link className="nav-item nav-link" to="/">Home</Link>
          <Link className="nav-item nav-link" to="/status">Status</Link>
          <Link className="nav-item nav-link" to="/query">Query</Link>
         {/* <Link className="nav-item nav-link" to="/mro">MRO</Link>
          <Link className="nav-item nav-link" to="/ias">IAS</Link>
          <Link className="nav-item nav-link" to="/cm">CM</Link>*/}
         <Link className="nav-item nav-link" to="/admin">Login </Link>
          
        </div>
        <div />

      </div>
    </nav>
  );
}

export default Navbar;