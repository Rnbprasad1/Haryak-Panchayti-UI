import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
=======


>>>>>>> origin/main
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
<<<<<<< HEAD
          <Link className="nav-item nav-link" to="/dashboard">Dashboard</Link> {/* Move Dashboard link here */}
          <div className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Admin
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/mro">MRO</Link>
              <Link className="dropdown-item" to="/ias">IAS</Link>
              <Link className="dropdown-item" to="/cm">CM</Link>
            </div>
          </div>
=======
         
         <Link className="nav-item nav-link" to="/admin">Login </Link>
          
>>>>>>> origin/main
        </div>
        <div />

      </div>
    </nav>
  );
}

export default Navbar;
