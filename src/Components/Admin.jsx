import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Alert, Table, Dropdown, Modal } from 'react-bootstrap';
import { DataContext } from './DataContext';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');
  const [loggedInDistrict, setLoggedInDistrict] = useState('');
  const [loggedInMandal, setLoggedInMandal] = useState('');
  const { formDataArray, updateStatus, updateAdminResponse, updateActionTakenDate, updateActionTakenBy, updateFormDataArray } = useContext(DataContext);
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterMandal, setFilterMandal] = useState('');
  const [filterVillage, setFilterVillage] = useState('');
  const [availableMandals, setAvailableMandals] = useState([]);
  const [availableVillages, setAvailableVillages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [adminComment, setAdminComment] = useState('');
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false);
  const [previousComments, setPreviousComments] = useState([]);

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

  const filteredData = formDataArray.filter((data) => {
    const searchRegex = new RegExp(searchQuery, 'i');

    if (userRole === 'CM' || userRole === 'IAS') {
      if (filterDistrict && filterMandal && filterVillage) {
        return (
          data.district === filterDistrict &&
          data.mandal === filterMandal &&
          data.village === filterVillage &&
          (data.token?.includes(searchQuery) ||
            data.mobile?.includes(searchQuery) ||
            data.name?.includes(searchQuery) ||
            data.aadhar?.includes(searchQuery) ||
            data.issueDescription?.includes(searchQuery) ||
            data.submittedDate?.includes(searchQuery))
        );
      } else if (filterDistrict && filterMandal) {
        return (
          data.district === filterDistrict &&
          data.mandal === filterMandal &&
          (data.token?.includes(searchQuery) ||
            data.mobile?.includes(searchQuery) ||
            data.name?.includes(searchQuery) ||
            data.aadhar?.includes(searchQuery) ||
            data.issueDescription?.includes(searchQuery) ||
            data.submittedDate?.includes(searchQuery))
        );
      } else if (filterDistrict) {
        return (
          data.district === filterDistrict &&
          (data.token?.includes(searchQuery) ||
            data.mobile?.includes(searchQuery) ||
            data.name?.includes(searchQuery) ||
            data.aadhar?.includes(searchQuery) ||
            data.issueDescription?.includes(searchQuery) ||
            data.submittedDate?.includes(searchQuery))
        );
      } else if (filterMandal) {
        return (
          data.mandal === filterMandal &&
          (data.token?.includes(searchQuery) ||
            data.mobile?.includes(searchQuery) ||
            data.name?.includes(searchQuery) ||
            data.aadhar?.includes(searchQuery) ||
            data.issueDescription?.includes(searchQuery) ||
            data.submittedDate?.includes(searchQuery))
        );
      } else if (filterVillage) {
        return (
          data.village === filterVillage &&
          (data.token?.includes(searchQuery) ||
            data.mobile?.includes(searchQuery) ||
            data.name?.includes(searchQuery) ||
            data.aadhar?.includes(searchQuery) ||
            data.submittedDate?.includes(searchQuery))
        );
      }
      return (
        data.token?.match(searchRegex) ||
        data.mobile?.match(searchRegex) ||
        data.name?.match(searchRegex) ||
        data.aadhar?.match(searchRegex) ||
        data.issueDescription?.match(searchRegex) ||
        data.submittedDate?.match(searchRegex)
      );
    } else if (userRole === 'MRO') {
      if (filterMandal && filterVillage) {
        return (
          data.mandal === loggedInMandal &&
          data.village === filterVillage &&
          (data.token?.includes(searchQuery) ||
            data.mobile?.includes(searchQuery) ||
            data.name?.includes(searchQuery) ||
            data.aadhar?.includes(searchQuery) ||
            data.issueDescription?.match(searchRegex) ||
            data.submittedDate?.includes(searchQuery))
        );
      } else if (filterMandal) {
        return (
          data.mandal === loggedInMandal &&
          (data.token?.includes(searchQuery) ||
            data.mobile?.includes(searchQuery) ||
            data.name?.includes(searchQuery) ||
            data.aadhar?.includes(searchQuery) ||
            data.issueDescription?.match(searchRegex) ||
            data.submittedDate?.includes(searchQuery))
        );
      } else if (filterVillage) {
        return (
          data.village === filterVillage &&
          (data.token?.includes(searchQuery) ||
            data.mobile?.includes(searchQuery) ||
            data.name?.includes(searchQuery) ||
            data.aadhar?.includes(searchQuery) ||
            data.issueDescription?.match(searchRegex) ||
            data.submittedDate?.includes(searchQuery))
        );
      }
      return (
        data.token?.match(searchRegex) ||
        data.mobile?.match(searchRegex) ||
        data.name?.match(searchRegex) ||
        data.aadhar?.match(searchRegex) ||
        data.issueDescription?.match(searchRegex) ||
        data.submittedDate?.match(searchRegex)
      );
    }
  });

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setFilterDistrict(district);
    setAvailableMandals(districts[district] || []);
    setFilterMandal('');
    setFilterVillage('');
    setAvailableVillages([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin' && password === 'CM@123') {
      setIsAuthenticated(true);
      setUserRole('CM');
      setError('');
    } else if (email === 'admin' && password === 'IAS@123') {
      setIsAuthenticated(true);
      setUserRole('IAS');
      setLoggedInDistrict('Palnadu');
      setError('');
    } else if (email === 'admin' && password === 'MRO@123') {
      setIsAuthenticated(true);
      setUserRole('MRO');
      setLoggedInMandal('Chilakaluripet');
      setError('');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleMandalChange = (e) => {
    const mandal = e.target.value;
    setFilterMandal(mandal);
    setAvailableVillages(mandals[mandal] || []);
    setFilterVillage('');
  };

  const handleVillageChange = (e) => {
    const village = e.target.value;
    setFilterVillage(village);
  };

  const districts = {
    'Palnadu': ['Chilakaluripet', 'Narsaraopet'],
    'Guntur': ['Tenali', 'Amaravathi'],
  };

  const mandals = {
    'Chilakaluripet': ['Pothavaram', 'Purshothapatanam'],
    'Narsarsaopet': ['Jonnalagadda', 'Palapadu'],
    'Tenali': ['Burripalem', 'Nelapadu'],
    'Amaravathi': ['Lingapuram', 'Unguturu'],
  };

  const handleShowModal = (data) => {
    setSelectedData(data);
    setAdminComment('');
    setPreviousComments(data.adminComments || []);
    setShowModal(true);
    setIsUpdateDisabled(data.status === 'completed');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedData(null);
    setAdminComment('');
    setPreviousComments([]);
  };

  const handleUpdateStatus = (status, adminResponse) => {
    if (selectedData) {
      const index = formDataArray.findIndex((data) => data.token === selectedData.token);
      const currentActionTakenDate = new Date().toISOString();
      const currentComment = {
        comment: adminResponse,
        role: userRole,
        timestamp: new Date().toLocaleString(),
      };

      updateStatus(index, status, adminResponse);
      updateAdminResponse(index, adminResponse);
      updateActionTakenBy(index, userRole); // Update the action taken by with the current user role
      if (status === 'completed' || status === 'In Progress') {
        updateActionTakenDate(index, currentActionTakenDate); // Update the action taken date with the current date
        sendMessageToUser(selectedData.mobile, adminResponse);
      }

      const updatedComments = [...previousComments, currentComment];
      const updatedData = { ...selectedData, adminComments: updatedComments, actionTakenDate: currentActionTakenDate, actionTakenBy: userRole }; // Update the actionTakenDate and actionTakenBy properties
      const updatedFormDataArray = [...formDataArray];
      updatedFormDataArray[index] = updatedData;

      // Update the formDataArray in the DataContext
      updateFormDataArray(updatedFormDataArray);

      if (status === 'completed') {
        setIsUpdateDisabled(true);
      }

      setSelectedData(updatedData);
      setPreviousComments(updatedComments);

      handleCloseModal();
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setLoggedInDistrict('');
    setLoggedInMandal('');
    setFilterDistrict('');
    setFilterMandal('');
    setFilterVillage('');
    setAvailableMandals([]);
    setAvailableVillages([]);
    setSearchQuery('');
    setShowModal(false);
    setSelectedData(null);
    setAdminComment('');
    setIsUpdateDisabled(false);
    setPreviousComments([]);
  };

  const adminComments = selectedData?.adminComments || [];

  console.log(adminComments);
  const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(', ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
};

const sortedComments = adminComments.sort((a, b) => {
    return parseDate(b.timestamp) - parseDate(a.timestamp);
});
  // Sort comments by timestamp in descending order
 // const sortedComments = adminComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
 console.log("TST") ;
 console.log(sortedComments)
 console.log("END") ;

  return (
    <Container>
      {isAuthenticated ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Submitted Queries</h2>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <Row>
            {userRole === 'CM' || userRole === 'IAS' ? (
              <Col>
                <Form.Group controlId="formDistrict">
                  <Form.Label>Filter by District</Form.Label>
                  <Form.Control as="select" value={filterDistrict} onChange={handleDistrictChange}>
                    <option value="">All Districts</option>
                    {Object.keys(districts).map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            ) : null}
            <Col>
              <Form.Group controlId="formMandal">
                <Form.Label>Filter by Mandal</Form.Label>
                <Form.Control as="select" value={filterMandal} onChange={handleMandalChange}>
                  <option value="">All Mandals</option>
                  {userRole === 'MRO'
                    ? Object.values(districts).flat().map((mandal) => (
                      <option key={mandal} value={mandal}>
                        {mandal}
                      </option>
                    ))
                    : availableMandals.map((mandal) => (
                      <option key={mandal} value={mandal}>
                        {mandal}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formVillage">
                <Form.Label>Filter by Village</Form.Label>
                <Form.Control as="select" value={filterVillage} onChange={handleVillageChange}>
                  <option value="">All Villages</option>
                  {availableVillages.map((village) => (
                    <option key={village} value={village}>
                      {village}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formSearch">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by token, mobile, name, Aadhar, date, Village"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <div style={{ marginBottom: '1rem' }}></div>

          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Ticket Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedData && (
                <Form>
                  <Row>
                    <Col>
                      <Form.Group controlId="formTokenNumber">
                        <Form.Label>Token Number</Form.Label>
                        <Form.Control
                          type="text"
                          value={selectedData.token}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formAadharNumber">
                        <Form.Label>Aadhar Number</Form.Label>
                        <Form.Control
                          type="text"
                          value={selectedData.aadhar}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={selectedData.name}
                          readOnly
                        />
                      </Form.Group>     </Col>
                    <Col>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={selectedData.email}
                          readOnly                         />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group controlId="formMobileNumber">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                              type="text"
                              value={selectedData.mobile}
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                              as="select"
                              value={selectedData.status}
                              onChange={(e) => setSelectedData({ ...selectedData, status: e.target.value })}
                              disabled={selectedData.status === 'completed'}
                            >
                              <option value="open">Open</option>
                              <option value="In Progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group controlId="formSubmittedDate">
                            <Form.Label>Submitted Date</Form.Label>
                            <Form.Control
                              type="text"
                              value={new Date(selectedData.submittedDate).toLocaleString()}
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="formActionTakenDate">
                            <Form.Label>Action Taken Date</Form.Label>
                            <Form.Control
                              type="text"
                              value={selectedData.actionTakenDate ? new Date(selectedData.actionTakenDate).toLocaleString() : '-'}
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group controlId="formIssueDetails">
                        <Form.Label>Issue Details</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={selectedData.issueDescription}
                          readOnly
                        />
                      </Form.Group>
                      
                      <Form.Group controlId="formPreviousComments">
      <Form.Label>Previous Comments</Form.Label>
      {sortedComments && sortedComments.length > 0 ? (
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
                 <strong>
                      {comment.role === "User" ? `User (${selectedData.name})` : comment.role}
                    </strong>
                <td>{comment.comment}</td>
                <td>{comment.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No previous comments available.</p>
      )}
    </Form.Group>

                      <Form.Group controlId="formAdminComment">
                        <Form.Label>Admin Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={adminComment}
                          onChange={(e) => setAdminComment(e.target.value)}
                          disabled={selectedData.status === 'completed' && !adminComment}
                        />
                      </Form.Group>
                    </Form>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleUpdateStatus(selectedData.status, adminComment)}
                    disabled={isUpdateDisabled}
                  >
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>
    
              {filteredData.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Token</th>
                      <th>District</th>
                      <th>Mandal</th>
                      <th>Aadhar</th>
                      <th>Issue Description</th>
                      <th>Village</th>
                      <th>Status</th>
                      <th>Submitted Date</th>
                      <th>Action Taken Date</th>
                      <th>Action Taken By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((data, index) => (
                      <tr key={index} onClick={() => handleShowModal(data)}>
                        <td>{data.token}</td>
                        <td>{data.district}</td>
                        <td>{data.mandal}</td>
                        <td>{data.aadhar}</td>
                        <td>{data.issueDescription}</td>
                        <td>{data.village}</td>
                        <td className={getStatusColor(data.status)}>{data.status}</td>
                        <td>{new Date(data.submittedDate).toLocaleString()}</td>
                        <td>
                          {data.actionTakenDate ? (
                            <small>{new Date(data.actionTakenDate).toLocaleString()}</small>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td>{data.actionTakenBy || '-'}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle variant="primary" id={`dropdown-${index}`}>
                              Update Action
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => handleUpdateStatus('In Progress', 'Action in progress')}>
                                Mark as In Progress
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => handleUpdateStatus('completed', 'Action completed')}>
                                Mark as Completed
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">No data available</Alert>
              )}
            </>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="USER_NAME"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
    
              {error && <Alert variant="danger">{error}</Alert>}
    
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Container>
      );
    };
    
    export default Admin;
    

