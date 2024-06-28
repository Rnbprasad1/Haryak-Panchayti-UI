import React, { useContext } from 'react';
import { Container, Table } from 'react-bootstrap';
import { DataContext } from '../Components/AdminComponents/DataContext';

const Dashboard = () => {
  const { formDataArray } = useContext(DataContext);

  return (
    <Container>
      <h1>Dashboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Aadhar</th>
            <th>Issue Description</th>
            <th>District</th>
            <th>Mandal</th>
            <th>Village</th>
            <th>Status</th>
            <th>Submitted Date</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          {formDataArray.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.mobile}</td>
              <td>{data.email}</td>
              <td>{data.aadhar}</td>
              <td>{data.issueDescription}</td>
              <td>{data.selectedDistrict}</td>
              <td>{data.selectedMandal}</td>
              <td>{data.village}</td>
              <td>{data.status}</td>
              <td>{new Date(data.submittedDate).toLocaleString()}</td>
              <td>{data.token}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;
