import React, { useContext } from 'react';
import { DataContext } from './AdminComponents/DataContext';

const Dashboard = () => {
  const { formDataArray } = useContext(DataContext);

  console.log('formDataArray in Dashboard:', formDataArray);

  if (!formDataArray || formDataArray.length === 0) {
    return <div>No queries available</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Aadhar</th>
            <th>Issue Description</th>
            <th>District</th>
            <th>Mandal</th>
            <th>Village</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {formDataArray.map((query, index) => (
            <tr key={index}>
              <td>{query.token}</td>
              <td>{query.name}</td>
              <td>{query.mobile}</td>
              <td>{query.email}</td>
              <td>{query.aadhar}</td>
              <td>{query.issueDescription}</td>
              <td>{query.district}</td>
              <td>{query.mandal}</td>
              <td>{query.village}</td>
              <td>{query.submittedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
