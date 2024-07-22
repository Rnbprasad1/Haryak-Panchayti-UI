import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Table, Dropdown, Modal,Card } from 'react-bootstrap';
import { DataContext } from '../AdminComponents/DataContext';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const IAS = () => {
  const { username, mandal } = useParams();
  const navigate = useNavigate();
  const [filterMandal, setFilterMandal] = useState('');
  const [filterVillage, setFilterVillage] = useState('');
  const [availableVillages, setAvailableVillages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [adminComment, setAdminComment] = useState('');
  const [previousComments, setPreviousComments] = useState([]);
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false);
  const [assignedTo, setAssignedTo] = useState('');
  const [villages] = useState({});
  const [filterStatus, setFilterStatus] = useState('');


  const {
    iasDataArray,
    updateStatus,
    updateAdminResponse,
    updateActionTakenDate,
    updateActionTakenBy,
    setIasDataArray,
    updateIASResponse
  } = useContext(DataContext);

  const villageCredentials = JSON.parse(localStorage.getItem('villageCredentials') || '{}');
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }
  useEffect(() => {
    if (mandal) {
      const mandalList = decodeURIComponent(mandal).split(',');
      setFilterMandal(mandalList[0]); // Set the first mandal as default
    }
  }, [mandal]);

  useEffect(() => {
    if (filterMandal) {
      setAvailableVillages(mandals[filterMandal] || []);
    }
  }, [filterMandal]);



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

  const filteredData = iasDataArray.filter((data) => {
    const searchRegex = new RegExp(searchQuery, 'i');
    const mandalMatch = mandal ? decodeURIComponent(mandal).split(',').includes(data.mandal) : true;
    const statusMatch = filterStatus ? data.status === filterStatus : true;

    return (
      mandalMatch &&
      statusMatch &&
      (filterVillage ? data.village === filterVillage : true) &&
      (data.token?.match(searchRegex) ||
        data.mobile?.match(searchRegex) ||
        data.name?.match(searchRegex) ||
        data.aadhar?.match(searchRegex) ||
        data.issueDescription?.match(searchRegex) ||
        data.submittedDate?.match(searchRegex))
    );
  });




  const handleMandalChange = (e) => {
    const selectedMandal = e.target.value;
    setFilterMandal(selectedMandal);
    setAvailableVillages(mandals[selectedMandal] || []);
    setFilterVillage('');
  };

  const handleVillageChange = (e) => {
    const village = e.target.value;
    setFilterVillage(village);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
  };

  const mandals = {
    'Addanki': ['Addanki North', 'Addanki South', 'Bommanampadu', 'Chakraya Palem', 'Chinakotha Palle', 'Dharmavaram', 'Dhenuva Konda', 'Gopalapuram', 'Kalavakuru', 'Kotikalapudi', 'Kunkupadu', 'Mani Keswaram', 'Modepalle', 'Mylavaram', 'Nannurupadu', 'Ramayapalem', 'Uppalapadu', 'Vemparala', 'Thimmayapalem'],
    'Bapatla': ['Adivi', 'Appikatla', 'Bapatla East', 'Bapatla West', 'Bharthipudi', 'Cheruvu', 'Etheru', 'Gopapuram', 'Gudipudi', 'Jammulapalem', 'Jillellamudi', 'Kankatapalem', 'Maruproluvaripalem', 'Mulapalem', 'Murukondapadu', 'Narasayapalem', 'Neredupalle', 'Poondla',],
    'Karlapalem': ['Buddam', 'Ganapavaram', 'Karlapalem', 'Perali', 'Yazali'],
    'Martur': ['Bobbe Palle', 'Bolla Palle', 'Darsiagraharam', 'Dronadula', 'Jangamaheswarapuram', 'Jonna Thali Agraharam', 'Kolala Pudi', 'Konanki', 'Lakkavaram Agraharam', 'Martur', 'Nagaraju Palle', 'Rajupalem', 'Valaparla',],
    'Parchur': ['Adusumalle', 'Bodawadamandagunta', 'Chennubhotla Palem', 'Cherukuru', 'Devara Palle', 'Edubadu', 'Garnepudi', 'Gollapudi', 'Inagallu', 'Nuthalapadu', 'Parchur', 'Ramanayapalem', 'Upputur', 'Veeranna Palem'],
    'Pittalavanipalem': ['Allur', 'Chandole', 'Khajipalem', 'Komali', 'Pittalavanipalem', 'Sangupalem',],
    'Yeddanapudi': ['Ananthavaram', 'Enamadala', 'Gannavaram', 'Jagarlamudi', 'Poluru', 'Punuru', 'Vinjanampadu', 'Yeddanapudi'],
    'Ballikurava': ['Annavaram', 'Chinamakkena', 'Ballikurava', 'Madduluru', 'Muppavaram', 'Vemavaram', 'Poluru', 'Tammavaram', 'Arumbaka', 'Inumella', 'Mellavagu', 'Nallapadu', 'Pedamakkena', 'Rudravaram', 'Tangedu', 'Venkatadripalem'],
    'Chinaganjam': ['Ainavolu', 'Bheeramvaripalem', 'Chinthagunta', 'Gajulapalem', 'Kothapalle', 'Marripudi', 'Nagulapadu', 'Pathepuram', 'Prathipadu', 'Ravipadu'],
    'Chirala': ['Chennupalli', 'Epuru', 'Irlapadu', 'Jandrapeta', 'Kothapeta', 'Perala', 'Ramachandrapuram', 'Sanjeevaiahpalem', 'Singarayakonda'],
    'Inkollu': ['Chimakurthy', 'Darsi', 'Inkollu', 'Kandukur', 'Maddipadu', 'Santhanuthalapadu'],
    'J. Panguluru': ['Alavalapadu', 'Budavada', 'Bytamanjulur', 'Chandalur', 'Janakavaram Panguluru', 'Kasyapuram', 'Konda Manjulur', 'Kondamur', 'Kotapadu', 'Muppavaram', 'Nuzendla Palle', 'Ramakuru', 'Reningavaram', 'Thurpu Koppera Padu', 'Thurpu Thakkella Padu'],
    'Karamchedu': ['Adivi', 'Appikatla', 'Bapatla East', 'Bapatla West', 'Bharthipudi', 'Cheruvu', 'Etheru', 'Gopapuram', 'Gudipudi', 'Jammulapalem', 'Jillellamudi', 'Kankatapalem', 'Maruproluvaripalem', 'Mulapalem', 'Murukondapadu'],
    'Korisapadu': ['Adavipalem', 'Bikshapathi Palle', 'Chiluvur', 'Dollapadu', 'Goraganamudi', 'Kantipudi', 'Kollipara', 'Krishnapuram', 'Mogallur', 'Nallapadu', 'Peddaganjam', 'Thimmapuram'],
    'Santhamaguluru': ['Akkalapadu', 'Chandlavaripalem', 'Cheemakurthi', 'Kodur', 'Laxmipuram', 'Madhavaram', 'Manchikalapadu', 'Nidamanuru', 'Pedanandipadu', 'Peddaganjam', 'Santhamaguluru', 'Vadlamudi', 'Yerragondapalem'],
    'Tsundur': ['Adivi', 'Bachina', 'Chandarlapadu', 'Gollapudi', 'Ippur', 'Kondapalli', 'Peddaganjam', 'Peddagudem', 'Reddigudem', 'Velivolu'],
    'Vemuru': ['Chintalapudi', 'Goribidanapadu', 'Jonnalagadda', 'Kothapalli', 'Maddipadu', 'Peddaganjam', 'Reddigudem', 'Sambepalle', 'Vemuru'],
    'Vetapalem': ['Ananthavaram', 'Gudur', 'Kankipadu', 'Kondapalli', 'Nallapadu', 'Penuganchiprolu', 'Peddaganjam', 'Sambepudi', 'Tadigadapa', 'Vadlamudi', 'Vikramasingapuram', 'Yacharam'],
    'Yeddanapudi': ['Enamadala', 'Gannavaram', 'Jagarlamudi', 'Poluru', 'Punuru', 'Vinjanampadu', 'Yeddanapudi']
  };



  const handleShowModal = (data) => {
    setSelectedData(data);
    setAdminComment('');
    setPreviousComments(data.adminComments || []);
    setShowModal(true);

    const villageUsername = villageCredentials[data.village]?.username || 'Not assigned';
    setAssignedTo(villageUsername)

  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedData(null);
    setAdminComment('');
    setPreviousComments([]);
  };

  const handleUpdateStatus = (status) => {
    if (selectedData) {
      const index = iasDataArray.findIndex((data) => data.token === selectedData.token);
      const currentActionTakenDate = new Date().toISOString();
      const currentComment = {
        comment: adminComment,
        role: username,
        timestamp: new Date().toLocaleString(),
      };

      if (status === 'open' && adminComment.trim() !== '') {
        status = 'In Progress';
      }

      updateStatus(index, status, adminComment, true);
      updateAdminResponse(index, adminComment, true);
      updateActionTakenBy(index, username, true);
      if (status === 'completed' || status === 'In Progress') {
        updateActionTakenDate(index, currentActionTakenDate, true);
        sendMessageToUser(selectedData.mobile, adminComment);
      }
      updateIASResponse(index, adminComment);

      const updatedComments = [...previousComments, currentComment];
      const updatedData = {
        ...selectedData,
        adminComments: updatedComments,
        actionTakenDate: currentActionTakenDate,
        actionTakenBy: username,
        status: status,
        iasResponse: adminComment
      };

      const updatedIasDataArray = [...iasDataArray];
      updatedIasDataArray[index] = updatedData;

      setIasDataArray(updatedIasDataArray);
      setSelectedData(updatedData);
      setPreviousComments(updatedComments);

      handleCloseModal();
    }
  };


  const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(', ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
  };

  const sortedComments = previousComments.sort((a, b) => {
    return parseDate(b.timestamp) - parseDate(a.timestamp);
  });

  const statusCounts = {
    open: 0,
    'In Progress': 0,
    completed: 0
  };

  const mandalCounts = {};

  iasDataArray.forEach(data => {
    statusCounts[data.status] = (statusCounts[data.status] || 0) + 1;
    mandalCounts[data.mandal] = (mandalCounts[data.mandal] || 0) + 1;
  });

  const totalTickets = iasDataArray.length;

  return (
    <Container fluid>
      <br></br><br></br>

      <Row className='mb-3'>
        <Col className="text-end">
          <Button variant="danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Logout
          </Button>
        </Col>
        </Row>

 <h2 className="mb-4 text-primary">{decodeURIComponent(filterMandal)} Analysis</h2>
<Row className="mb-4">
  <Col md={3} className="mb-3">
    <Card className="text-center h-100 shadow-sm border-0">
      <Card.Body className="d-flex flex-column justify-content-center">
        <Card.Title className="text-muted">Total Tickets</Card.Title>
        <Card.Text className="display-4 font-weight-bold text-primary">{filteredData.length}</Card.Text>
        <i className="fas fa-ticket-alt fa-3x text-primary mt-2"></i>
      </Card.Body>
    </Card>
  </Col>
  {['open', 'In Progress', 'completed'].map((status) => {
    const count = filteredData.filter(data => data.status === status).length;
    return (
      <Col md={3} key={status} className="mb-3">
        <Card className="text-center h-100 shadow-sm border-0">
          <Card.Body className="d-flex flex-column justify-content-center">
            <Card.Title className="text-muted">{status}</Card.Title>
            <Card.Text className="display-4 font-weight-bold" style={{color: status === 'open' ? '#dc3545' : status === 'In Progress' ? '#ffc107' : '#28a745'}}>
              {count}
            </Card.Text>
            <i className={`fas fa-${status === 'open' ? 'exclamation-circle' : status === 'In Progress' ? 'clock' : 'check-circle'} fa-3x mt-2`}
                style={{color: status === 'open' ? '#dc3545' : status === 'In Progress' ? '#ffc107' : '#28a745'}}></i>
          </Card.Body>
        </Card>
      </Col>
    );
  })}
</Row>
      <h2 className="mb-4">{decodeURIComponent(mandal)} Dashboard - Escalated Queries</h2>
      <Row className="mb-3">
        <Col xs={12} md={4}>
          <Form.Group controlId="formMandal">
            <Form.Label>Mandal</Form.Label>
            <Form.Control as="select" value={filterMandal} onChange={handleMandalChange}>
              {decodeURIComponent(mandal).split(',').map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-3">
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
        <Col xs={12} md={6} lg={4} className="mb-3">
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

        <Col md={3}>
          <Form.Control
            as="select"
            value={filterStatus}
            onChange={handleStatusChange}
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="completed">Completed</option>
          </Form.Control>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Ticket Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData && (
            <Form>
              <Row>
                <Col xs={12} md={6} className="mb-3">
                  <Form.Group controlId="formTokenNumber">
                    <Form.Label>Token Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedData.token}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} className="mb-3">
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
                <Col xs={12} md={6} className="mb-3">
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedData.name}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} className="mb-3">
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={selectedData.email}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6} className="mb-3">
                  <Form.Group controlId="formMobileNumber">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedData.mobile}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} className="mb-3">
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
                <Col xs={12} md={6} className="mb-3">
                  <Form.Group controlId="formSubmittedDate">
                    <Form.Label>Submitted Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={new Date(selectedData.submittedDate).toLocaleString()}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} className="mb-3">
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
              <Form.Group controlId="formIssueDetails" className="mb-3">
                <Form.Label>Issue Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedData.issueDescription}
                  readOnly
                />
              </Form.Group>
              {selectedData && (
                <Form.Group className="mb-3">
                  <Form.Label>Assigned To</Form.Label>
                  <Form.Control
                    type="text"
                    value={villageCredentials[selectedData.village]?.username || ''}
                    readOnly
                  />
                </Form.Group>
              )}

              <Form.Group controlId="formPreviousComments" className="mb-3">
                <Form.Label>Previous Comments</Form.Label>
                {sortedComments && sortedComments.length > 0 ? (
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
                            <td><strong>{comment.role === "User" ? `(${selectedData.name})` : username}</strong></td>
                            <td>{comment.comment}</td>
                            <td>{comment.timestamp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <p>No previous comments available.</p>
                )}
              </Form.Group>

              <Form.Group controlId="formAdminComment" className="mb-3">
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
            variant="primary" onClick={() => handleUpdateStatus(selectedData.status)}
            disabled={isUpdateDisabled}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {filteredData.length > 0 ? (
        <div className="table-responsive">
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
                        <Dropdown.Item onClick={() => handleUpdateStatus('In Progress')}>
                          Mark as In Progress
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleUpdateStatus('completed')}>
                          Mark as Completed
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Alert variant="info">No data available</Alert>
      )}
    </Container>
  );
};

export default IAS;