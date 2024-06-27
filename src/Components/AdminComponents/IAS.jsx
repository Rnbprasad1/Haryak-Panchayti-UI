import React, { useState } from 'react';
import { Form, Button, Modal, Table } from 'react-bootstrap';

const IAS = ({ data, onDataUpdate }) => {
  const [showModal, setShowModal] = useState(true);
  const [adminComment, setAdminComment] = useState('');
  const [status, setStatus] = useState(data ? data.status : 'open');

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateStatus = () => {
    if (data) {
      const updatedData = {
        ...data,
        status,
        adminComments: [
          ...(data.adminComments || []),
          {
            comment: adminComment,
            role: 'IAS',
            timestamp: new Date().toLocaleString(),
          },
        ],
        actionTakenDate: new Date().toISOString(),
        actionTakenBy: 'IAS',
      };

      onDataUpdate(updatedData);
      handleCloseModal();
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>IAS Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data ? (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Aadhar</th>
                  <th>Issue Description</th>
                  <th>Submitted Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.token}</td>
                  <td>{data.name}</td>
                  <td>{data.mobile}</td>
                  <td>{data.aadhar}</td>
                  <td>{data.issueDescription}</td>
                  <td>{new Date(data.submittedDate).toLocaleString()}</td>
                </tr>
              </tbody>
            </Table>

            <Form>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formAdminComment">
                <Form.Label>Admin Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                />
              </Form.Group>
            </Form>
          </>
        ) : (
          <p>No data available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateStatus} disabled={!data}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IAS;
