import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import apMapImage from '././Apmap.png';
import Footer from './Footer';
import { DataContext } from '../Components/AdminComponents/DataContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const QueryDashboard = () => {
  const { formDataArray } = useContext(DataContext);
  const [queriesData, setQueriesData] = useState({});
  const [totalQueries, setTotalQueries] = useState(0);

  useEffect(() => {
    const mandalCounts = formDataArray.reduce((acc, query) => {
      if (query.mandal) {
        acc[query.mandal] = (acc[query.mandal] || 0) + 1;
      }
      return acc;
    }, {});

    setQueriesData(mandalCounts);
    setTotalQueries(Object.values(mandalCounts).reduce((sum, count) => sum + count, 0));
  }, [formDataArray]);

  const pieChartData = {
    labels: Object.keys(queriesData),
    datasets: [
      {
        data: Object.values(queriesData),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
        ],
      },
    ],
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <h2 className="text-center mb-4">Panchayati Raj Helpdesk</h2>
          <h3 className="text-center mb-4">Total Queries: {totalQueries}</h3>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <div className="bg-white p-5 rounded shadow">
            <h4 className="text-center mb-4">Queries by Mandal</h4>
            <Pie data={pieChartData} />
          </div>
        </Col>
        <Col md={6}>
          <div className="bg-white p-5 rounded shadow">
            <h4 className="text-center mb-4">Map</h4>
            <img src={apMapImage} alt="Map" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        </Col>
      </Row>
      <br></br> <br></br>
      <Footer />
    </Container>
  );
};

export default QueryDashboard;