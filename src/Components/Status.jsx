import React, { useState, useContext } from 'react';
import { Form, Button, Table, Modal, Container, Row, Col } from 'react-bootstrap';
import { DataContext } from '../Components/AdminComponents/DataContext';
import Footer1 from './Footer1'

const Status = ({ enteredByName }) => {
  const { formDataArray, updateStatus, updateAdminResponse, updateActionTakenDate, updateActionTakenBy, updateFormDataArray } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [adminComment, setAdminComment] = useState('');
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false);

  const sendMessageToUser = (mobileNumber, message) => {
    console.log(`Sending message "${message}" to mobile number ${mobileNumber}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'text-danger';
      case 'In Progress':
        return 'text-warning';
      case 'completed':
        return 'text-success';
      default:
        return '';
    }
  };

  const handleSearch = () => {
    const result = formDataArray.filter((data) => data.token === searchQuery);
    setFilteredData(result);
  };

  const handleShowModal = (data) => {
    setSelectedData(data);
    setAdminComment('');
    setShowModal(true);
    setIsUpdateDisabled(data.status === 'completed');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedData(null);
    setAdminComment('');
  };

  const handleUpdateStatus = (status, adminResponse) => {
    if (selectedData) {
      const index = formDataArray.findIndex((data) => data.token === selectedData.token);
      const currentActionTakenDate = new Date().toISOString();
      const currentComment = {
        comment: adminResponse,
        name: enteredByName,
        timestamp: new Date().toLocaleString(),
        role: 'User',
      };

      updateStatus(index, status, adminResponse);
      updateAdminResponse(index, adminResponse);
      updateActionTakenBy(index, 'Admin');
      if (status === 'completed' || status === 'In Progress') {
        updateActionTakenDate(index, currentActionTakenDate);
        sendMessageToUser(selectedData.mobile, adminResponse);
      }

      const updatedComments = [...(selectedData.adminComments || []), currentComment];
      const updatedData = { ...selectedData, adminComments: updatedComments, actionTakenDate: currentActionTakenDate, actionTakenBy: 'Admin' };
      const updatedFormDataArray = [...formDataArray];
      updatedFormDataArray[index] = updatedData;

      updateFormDataArray(updatedFormDataArray);

      if (status === 'completed') {
        setIsUpdateDisabled(true);
      }

      setSelectedData(updatedData);
    }

    handleCloseModal();
  };

  const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(', ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
  };

  const sortedComments = (selectedData?.adminComments || []).sort((a, b) => parseDate(b.timestamp) - parseDate(a.timestamp));

  return (
    <Container fluid>

      <br></br>
     <Row className="mb-3 justify-content-center">
  <Col xs={12} md={6} lg={4}>
    <div className="input-group">
      <Form.Control
        type="text"
        placeholder="Enter token number"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-primary"
      />
      <div className="input-group-append">
        <Button
          variant="primary"
          onClick={handleSearch}
          className="rounded-right"
        >
          Search
        </Button>
      </div>
    </div>
  </Col>
</Row>


      {filteredData.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Token</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Aadhar</th>
                <th>Issue Description</th>
                <th>Submitted Date</th>
                <th>Status</th>
                <th>Comments</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data) => (
                <tr key={data.token}>
                  <td>{data.token}</td>
                  <td>{data.name}</td>
                  <td>{data.mobile}</td>
                  <td>{data.aadhar}</td>
                  <td>{data.issueDescription}</td>
                  <td>{data.submittedDate}</td>
                  <td className={getStatusColor(data.status)}>{data.status}</td>
                  <td>
                    <ul className="list-unstyled">
                      {data.adminComments && data.adminComments.length > 0 ? (
                        data.adminComments.map((comment, index) => (
                          <li key={index}>
                            <strong>{comment.name} ({comment.role}):</strong> {comment.comment} <em>({comment.timestamp})</em>
                          </li>
                        ))
                      ) : (
                        <p>No comments yet.</p>
                      )}
                    </ul>
                  </td>
                  <td>
                    <Button variant="info" onClick={() => handleShowModal(data)}>View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {selectedData && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Update Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12} md={6}>
                <p><strong>Token:</strong> {selectedData.token}</p>
                <p><strong>Name:</strong> {selectedData.name}</p>
                <p><strong>Mobile:</strong> {selectedData.mobile}</p>
                <p><strong>Aadhar:</strong> {selectedData.aadhar}</p>
              </Col>
              <Col xs={12} md={6}>
                <p><strong>Issue Description:</strong> {selectedData.issueDescription}</p>
                <p><strong>Submitted Date:</strong> {selectedData.submittedDate}</p>
                <p><strong>Status:</strong> <span className={getStatusColor(selectedData.status)}>{selectedData.status}</span></p>
              </Col>
            </Row>
            <Form.Group controlId="formAdminComment">
              <Form.Label>User Comment</Form.Label>
              <Form.Control as="textarea" rows={3} value={adminComment} onChange={(e) => setAdminComment(e.target.value)} disabled={isUpdateDisabled} />
            </Form.Group>
            <Button variant="success" onClick={() => handleUpdateStatus('In Progress', adminComment)} disabled={isUpdateDisabled} className="mt-2">Update</Button>
            
            <div className="mt-4">
              <h5>Previous Comments:</h5>
              {sortedComments.length > 0 ? (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Role</th>
                        <th>Comment</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedComments.map((comment, index) => (
                        <tr key={index}>
                          <td><strong>{comment.role === "User" ? `(${selectedData.name})` : comment.role}</strong></td>
                          <td>{comment.comment}</td>
                          <td>{comment.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <p>No previous comments.</p>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
      <br></br>
  <br></br>    <Footer1 />
    </Container>
  );
};

export default Status;