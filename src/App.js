import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import CM from './Components/AdminComponents/CM';
import IAS from './Components/AdminComponents/IAS';
import MRO from './Components/AdminComponents/MRO';
import Query from './Components/Query';
import Status from './Components/Status';
import Dashboard from './Components/Dashboard';
import bannerImage from './Assets/AP.png'; // Ensure this path is correct
import Navbar from './Components/NavBar';
import { DataProvider } from './Components/AdminComponents/DataContext';
import FormComponent from './Components/FormComponent';

function App() {
  const [queries, setQueries] = useState([]);

  const handleQuerySubmit = (formData) => {
    setQueries([...queries, formData]);
  };

  console.log(bannerImage); // Log the image path to check if it's resolved correctly

  return (
    <DataProvider>
      <Router>
        <div className="App">
          <header className="App-header" style={{ backgroundImage: `url(${bannerImage})` }}>
            {/* Add your header content here */}
          </header>
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/cm" element={<CM />} />
              <Route path="/mro" element={<MRO />} />
              <Route path="/ias" element={<IAS />} />
              <Route path="/query" element={<Query handleQuerySubmit={handleQuerySubmit} />} />
              <Route path="/status" element={<Status />} />
              <Route path="/dashboard" element={<Dashboard queries={queries} />} />
              <Route path="/form" element={<FormComponent />} />
              <Route exact path="/admin" element={<FormComponent />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
