import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './App.css';
import Home from './Components/Home';
import CM from './Components/AdminComponents/CM';
import IAS from './Components/AdminComponents/IAS';
import MRO from './Components/AdminComponents/MRO';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Query from './Components/Query';
import Status from './Components/Status';
import bannerImage from './Assets/AP.png'; // Existing image for large screens
import smallBannerImage from './Assets/AP1.png'; // New image for small screens
import Navbar from './Components/NavBar';
import { DataProvider } from './Components/AdminComponents/DataContext';
import FormComponent from './Components/FormComponent';
import Dashboard from './Components/Dashboard';

function App() {
  useEffect(() => {
    const updateBackground = () => {
      const header = document.querySelector('.App-header');
      if (window.innerWidth <= 768) {
        header.style.backgroundImage = `url(${smallBannerImage})`;
      } else {
        header.style.backgroundImage = `url(${bannerImage})`;
      }
    };
    
    window.addEventListener('resize', updateBackground);
    updateBackground(); // Initial call

    return () => window.removeEventListener('resize', updateBackground);
  }, []);

  return (
    <DataProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            {/* Add your header content here */}
          </header>
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path='/cm' element={<CM />} />
              <Route path="/mro/:loggedInMandal" element={<MRO />}/>
              <Route path="/ias" element={<IAS />} />
              <Route path="/query" element={<Query />} />
              <Route path="/status" element={<Status />} />
              <Route exact path='/login' element={<FormComponent />} />
              <Route path="/admin" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
