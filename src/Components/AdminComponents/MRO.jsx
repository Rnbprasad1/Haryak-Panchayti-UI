import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Table, Dropdown, Modal,Card } from 'react-bootstrap';
import { DataContext } from '../AdminComponents/DataContext';
import IAS from './IAS';
import { useParams, useNavigate } from 'react-router-dom';
import{FaSignOutAlt} from 'react-icons/fa';

const MROAdmin = () => {
  const [filterMandal, setFilterMandal] = useState('');
  const [filterVillages, setFilterVillages] = useState([]);
  const [availableVillages, setAvailableVillages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [adminComment, setAdminComment] = useState('');
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false);
  const [previousComments, setPreviousComments] = useState([]);
  const [isTimeExceeded, setIsTimeExceeded] = useState(false);
  const [tokenSentToIAS, setTokenSentToIAS] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);
  const [iasDataArray, setIasDataArray] = useState([]);
  const { username, villages } = useParams();
  const navigate = useNavigate();
  const [loggedInUsername, setLoggedInUsername] = useState(username);
  const [villageCredentials, setVillageCredentials] = useState({});
  const [filterStatus, setFilterStatus] = useState('');

  const { formDataArray, updateStatus, updateAdminResponse, updateActionTakenDate, updateActionTakenBy, updateFormDataArray } = useContext(DataContext);
  const { loggedInMandal } = useParams();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  useEffect(() => {
    const storedVillageCredentials = JSON.parse(localStorage.getItem('villageCredentials')) || {};
    setVillageCredentials(storedVillageCredentials);
  }, []);

  useEffect(() => {
    const villagesFromUrl = villages.split(',');
    setFilterVillages(villagesFromUrl);

    let mandalFound = '';
    for (const mandal in mandals) {
      if (mandals[mandal].some((village) => villagesFromUrl.includes(village))) {
        mandalFound = mandal;
        setAvailableVillages(mandals[mandal]);
        break;
      }
    }
    setFilterMandal(mandalFound);
  }, [villages]);

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
    const statusMatch = filterStatus ? data.status === filterStatus : true;
    return (
      data.mandal === filterMandal &&
      statusMatch &&
      filterVillages.includes(data.village) &&
      (data.token?.includes(searchQuery) ||
        data.mobile?.includes(searchQuery) ||
        data.name?.includes(searchQuery) ||
        data.aadhar?.includes(searchQuery) ||
        data.issueDescription?.match(searchRegex) ||
        data.submittedDate?.includes(searchQuery))
    );
  });

  const mandals = {
    'Bhadrachalam': ['Bandigumpu', 'Gannavaram', 'Bhadrachalam', 'Anantharam', 'Buggapadu', 'Cherukupalli', 'Achuthapuram', 'Ayyavaripeta', 'Bandigumpu', 'Bandirevu', 'Boddugudem', 'Buruguvai', 'Buttaigudem', 'Chandrampalem',
      'Chelempalem', 'Chinna Nallakunta', 'Chinthalagudem', 'Chowdavaram', 'Devarapalle', 'Doramitta', 'Fergusanpeta', 'Gannavaram', 'Gogubaka', 'Gollagudem', 'Gollaguppa', 'Gommu Koyagudem',
      'Gottugudem', 'Gundala', 'K. Narayanapuram', 'Kannaigudem', 'Kannapuram', 'Kapavaram', 'Kapugampalle', 'Kistaram', 'Kothagudem', 'Kusumanapalle', 'Lakshmidevipeta', 'Laxmipuram', 'Lingalapalle', 'Madhavaraopeta',
      'Mummadivaru', 'Murumoor', 'Nallakunta', 'Nandigama', 'Narasingapeta', 'Nellipaka', 'Pandurangapuram', 'Pattucheera', 'Penuballe', 'Pinapalle', 'Viswapuram', 'Yerragunta'
    ],

    'Wazedu': ['Arguntapalle', 'Arlagudem', 'Cherukur', 'Chintoor', 'Edjarlapalli', 'Gummadidoddi', 'Kongala', 'Krishnapuram', 'Murmur', 'Nagaram', 'Peruru', 'Chandrupatla', 'Lingapeta', 'China Gangaram', 'Tekulagudem'],
    'Venkatapuram': ['A Kathigudem', 'Bandagudem', 'Alubaka [G]', 'Alubaka [Z]', 'Ankannagudem', 'Bandagudem', 'Barlagudem', 'Bodapuram [G]', 'Chalamala', 'Chinagangaram', 'Chirtapalle', 'Doli', 'Edhira [G]', 'Ippagudem', 'K.Kondapuram [Z]',
      'Kalipaka [G]', 'Koyabestagudem', 'Mahitapuram', 'Mallapuram', 'Marikala', 'Morram Vanigudem [G]', 'Nuguru', 'Palem', 'Pamunoor', 'Pujarigudem [Z]', 'Rachapalle', 'Ramavaram', 'Sudibaka', 'Tadapala', 'Uppedu', 'Veerabhadraram', 'Venkatapuram',
      'Wadagudem', 'Zella'
    ],
    'Cherla': ['Chalamala', 'Chimalapadu', 'Bathinapalle', 'Bhumullanka', 'Bodanalli', 'C. Kathigudem', 'Cherla', 'Chimalapadu', 'China Midisileru', 'Chintaguppa', 'Chintakunta', 'Dandupeta', 'Devarapalle', 'Dosillapalle', 'Gampalle', 'Gannavaram', 'Gogubaka', 'Gommugudem', 'Gommupulliboinapalle', 'Jangalapalle',
      'Jettigudem', 'Kaliveru', 'Kesavapuram', 'Kothapalle', 'Kothuru', 'Koyyuru', 'Kudunuru', 'Kurnapalle', 'Lingala', 'Lingapuram', 'Mamidigudem', 'Mogullapalle', 'Mummidaram', 'Peda Midisileru', 'Peddipalle', 'Puliboinapalle', 'Puligundala',
      'Pusuguppa', 'Rallagudem', 'Vaddipet', 'Uyyalamadugu'
    ],
    'Dummugudem': ['Achuthapuram', 'Bojjiguppa', 'Achuthapuram', 'Adavi Ramavaram', 'Anjubaka', 'Arlagudem', 'Bandarugudem', 'Bheemavaram', 'Bojjiguppa', 'Burra Vemula', 'Byragulapadu', 'Cherupalle', 'Chinnabandirevu', 'Chintaguppa', 'Dabbanuthula', 'Dantenam', 'Dharmapuram', 'Dummugudem', 'Fowlerpeta', 'Gangolu', 'Gouravaram',
      'Govindapuram', 'Gurralabayalu', 'Jinnegattu', 'Kannapuram', 'Kasinagaram', 'Katayagudem', 'Kesavapatnam', 'Kommanapalle', 'Kotha Dummugudem', 'Kothagudem', 'Kothajinnalagudem', 'Kothapalle', 'Kothuru', 'Lachigudem', 'Lakshminagaram', 'Lakshmipuram', 'Lingapuram', 'Mahadevapuram', 'Manguvai', 'Marayagudem', 'Maredubaka', 'Mulakanapalle',
      'Nadikudi', 'Narsapuram', 'Paidagudem'
    ]
  };

  const handleShowModal = (data) => {
    setSelectedData(data);
    setAdminComment('');
    setPreviousComments(data.adminComments || []);
    setShowModal(true);
    setHasResponded(data.adminComments && data.adminComments.length > 0);
    setTokenSentToIAS(false);

    const submittedTime = new Date(data.submittedDate);
    const currentTime = new Date();
    const timeDiff = currentTime - submittedTime;
    const oneMinute = 60 * 1000;

    if (timeDiff > oneMinute && !data.adminResponse && data.status === 'open') {
      setIsTimeExceeded(true);
      setIsUpdateDisabled(true);
      setTokenSentToIAS(true);
      const updatedIasDataArray = [...iasDataArray, data];
      setIasDataArray(updatedIasDataArray);
    }

    const timeExceeded = timeDiff > oneMinute && !data.adminResponse && data.status === 'open';
    setIsTimeExceeded(timeExceeded);
    setIsUpdateDisabled(data.status === 'completed' || (timeExceeded && !hasResponded));

    if (timeExceeded) {
      setTokenSentToIAS(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedData(null);
    setAdminComment('');
    setPreviousComments([]);
    setTokenSentToIAS(false);
    setHasResponded(false);
  };

  const handleUpdateStatus = (status, adminResponse) => {
    if (selectedData) {
      const index = formDataArray.findIndex((data) => data.token === selectedData.token);
      const currentActionTakenDate = new Date().toISOString();
      const currentComment = {
        comment: adminResponse,
        role: username,
        timestamp: new Date().toLocaleString(),
    };

    if (status === 'open' && adminResponse.trim() !== '') {
      status = 'In Progress';
    }

    updateStatus(index, status, adminResponse);
    updateAdminResponse(index, adminResponse);
    updateActionTakenBy(index, loggedInMandal + ' admin');
    if (status === 'completed' || status === 'In Progress') {
      updateActionTakenDate(index, currentActionTakenDate);
      sendMessageToUser(selectedData.mobile, adminResponse);
    }

    const updatedComments = [...previousComments, currentComment];
    const updatedData = {
      ...selectedData,
      adminComments: updatedComments,
      actionTakenDate: currentActionTakenDate,
      actionTakenBy: username,
      status: status
    };
    const updatedFormDataArray = [...formDataArray];
    updatedFormDataArray[index] = updatedData;

    updateFormDataArray(updatedFormDataArray);

    setIsUpdateDisabled(status === 'completed');
    setSelectedData(updatedData);
    setPreviousComments(updatedComments);
    setTokenSentToIAS(false);
    setHasResponded(true);

    handleCloseModal();
  }
};

  const handleDataUpdate = (updatedData) => {
    const updatedFormDataArray = [...formDataArray];
    const index = updatedFormDataArray.findIndex((data) => data.token === updatedData.token);
    updatedFormDataArray[index] = updatedData;
    updateFormDataArray(updatedFormDataArray);
    setTokenSentToIAS(false);
  };
  const handleStatusChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
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

  const getTicketCounts = () => {
    const counts = {
      open: 0,
      inProgress: 0,
      completed: 0
    };
  
    filteredData.forEach(data => {
      if (data.status === 'open') counts.open++;
      else if (data.status === 'In Progress') counts.inProgress++;
      else if (data.status === 'completed') counts.completed++;
    });
  
    return counts;
  };
  
 
  const ticketCounts = getTicketCounts();

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

      <h2 className="mb-4 text-primary">{decodeURIComponent(filterVillages)} Analysis</h2>
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



      <Row className="mb-3">
        <Col>
          <h2>Submitted Queries</h2>
        </Col>
      </Row>
     <Row className="mb-3">
     <Col xs={12} md={4}>
          <Form.Group controlId="formMandal">
            <Form.Label>Mandal</Form.Label>
            <Form.Control type="text" value={filterMandal} readOnly />
          </Form.Group>
        </Col>
       <Col xs={12} md={4}>
  <Form.Group controlId="formVillage">
    <Form.Label>Filter by Village</Form.Label>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-village" disabled>
        Select Villages
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {availableVillages.map((village) => (
          <Dropdown.Item 
            key={village}
            active={filterVillages.includes(village)}
            disabled
            onClick={() => {
              if (filterVillages.includes(village)) {
                setFilterVillages(filterVillages.filter(v => v !== village));
              } else {
                setFilterVillages([...filterVillages, village]);
              }
            }}
          >
            {village}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  </Form.Group>
</Col>
        <Col xs={12} md={4}>
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

     <Col xs={12} md={4} className="mt-3">
  <Form.Group controlId="formStatusFilter">
    <Form.Label>Filter by Status</Form.Label>
    <Form.Select
      value={filterStatus}
      onChange={handleStatusChange}
      className="form-control-lg"
    >
      <option value="">All Status</option>
      <option value="open">Open</option>
      <option value="In Progress">In Progress</option>
      <option value="completed">Completed</option>
    </Form.Select>
  </Form.Group>
</Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className='TableContainer'>
            <tr>
              <th>Token</th>
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
      </div>

      {filteredData.length === 0 && (
        <Alert variant="info">No data available</Alert>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Ticket Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData && (
            <Form>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formTokenNumber">
                    <Form.Label>Token Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedData.token}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
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
                <Col xs={12} md={6}>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedData.name}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
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
                <Col>
                  <Form.Group controlId="formMobile">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedData.mobile}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formIssueDescription">
                    <Form.Label>Issue Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={selectedData.issueDescription}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formSubmittedDate">
                    <Form.Label>Submitted Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedData.submittedDate}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
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
                  <Form.Group controlId="formAdminComment">
                    <Form.Label>Admin Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={adminComment}
                      onChange={(e) => {
                        setAdminComment(e.target.value);
                        setHasResponded(true);
                      }}
                      disabled={isUpdateDisabled && !hasResponded}
                    />
                  </Form.Group>
                </Col>
              </Row>

         <Form.Group controlId="formPreviousComments">
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
             <td><strong>{comment.role === "User" ? selectedData.name : (comment.role === "IAS" ? selectedData.mandal : comment.role)}</strong></td>
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

              {isTimeExceeded && !hasResponded && (
                <Row>
                  <Col>
                    <Alert variant="danger">
                      The issue has not been resolved within 1 minute. The ticket will be
                      escalated to the {decodeURIComponent(filterMandal)} MRO.
                    </Alert>
                    {!tokenSentToIAS && (
                      <IAS
                        data={selectedData}
                        handleDataUpdate={handleDataUpdate}
                        setTokenSentToIAS={setTokenSentToIAS}
                      />
                    )}
                  </Col>
                </Row>
              )}
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
            disabled={isUpdateDisabled || (isTimeExceeded && !hasResponded && !tokenSentToIAS)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MROAdmin;
