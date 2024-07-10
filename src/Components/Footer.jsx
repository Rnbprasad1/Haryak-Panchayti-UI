import React from 'react';
import { Ripple, initMDB } from 'mdb-ui-kit';

const Footer = () => {
  // Initialization for ES Users
  initMDB({ Ripple });

  return (
    <footer className="bg-body-tertiary text-center">
      {/* Grid container */}
      <div className="container p-4">
        {/* Section: Images */}
        <section className="">
          <div className="row">
            <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
              <div data-mdb-ripple-init className="bg-image hover-overlay shadow-1-strong rounded" data-ripple-color="light">
                <img src="https://drpemmasani.com/wp-content/uploads/2024/01/Free-Water-Supply-By-Chandra-Sekhar-Pemmasani-1.webp" className="w-100" />
                <a href="#!">
                  <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
              <div data-mdb-ripple-init className="bg-image hover-overlay shadow-1-strong rounded" data-ripple-color="light">
                <img src="https://drpemmasani.com/wp-content/uploads/2024/01/Uworld-Leadership-1024x683.webp" className="w-100" />
                <a href="#!">
                  <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
              <div data-mdb-ripple-init className="bg-image hover-overlay shadow-1-strong rounded" data-ripple-color="light">
                <img src="https://i.ytimg.com/vi/AKFuR0IxCvI/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGHIgVSgzMA8=&rs=AOn4CLBV8whvVHIIeGBs0WOr0vuP80xJog" className="w-100" />
                <a href="#!">
                  <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
              <div data-mdb-ripple-init className="bg-image hover-overlay shadow-1-strong rounded" data-ripple-color="light">
                <img src="https://2.hlimg.com/images/things2do/300X200/ttd_20181129144919154348315956478t.jpg" className="w-100" />
                <a href="#!">
                  <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
              <div data-mdb-ripple-init className="bg-image hover-overlay shadow-1-strong rounded" data-ripple-color="light">
                <img src="https://cdn.dailypicked.com/wp-content/uploads/2019/11/amaravathi-capital-city-of-andhra-pradesh.jpeg" className="w-100" />
                <a href="#!">
                  <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
              <div data-mdb-ripple-init className="bg-image hover-overlay shadow-1-strong rounded" data-ripple-color="light">
                <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/26/59/a3/view-from-the-temple.jpg?w=500&h=300&s=1" className="w-100" />
                <a href="#!">
                  <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Section: Images */}
      </div>
      {/* Grid container */}

      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className="text-body" href="/">
          Guntur MP Helpdesk
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
