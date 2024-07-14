import React from 'react';
import { Ripple, initMDB } from 'mdb-ui-kit';

const Footer = () => {
  // Initialization for ES Users
  initMDB({ Ripple });

  return (
    <footer className="bg-body-tertiary text-center">
      {/* Grid container */}
    
    {/* 

      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className="text-body" href="/">
        Panchayati Raj Helpdesk
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
