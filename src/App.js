import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Admin from './Components/Admin';
import Query from './Components/Query';
import Status from './Components/Status';
import bannerImage from './Assets/AP.png'; // Make sure to replace 'Aadhra Pradesh.png' with your actual image file name
import Navbar from './Components/NavBar';

function App() {
  console.log(bannerImage); // Log the image path to check if it's resolved correctly
  return (
    <Router>
      <div className="App">
        <header className="App-header" style={{ backgroundImage: `url(${bannerImage})` }}>
          {/* Add your header content here */}
        </header>
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/query" element={<Query />} />
            <Route path="/status" element={<Status />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;