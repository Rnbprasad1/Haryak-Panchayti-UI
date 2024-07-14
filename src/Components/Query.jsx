import React, { useState, useEffect, useContext } from 'react';
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { DataContext } from '../Components/AdminComponents/DataContext';
import Footer1 from './Footer1';

const Query = () => {
  const { handleQuerySubmit } = useContext(DataContext);

  const [districts, setDistricts] = useState({});
  const [mandals, setMandals] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState('Adilabad');
  const [selectedMandal, setSelectedMandal] = useState('Pedanandipadu');
  const [availableMandals, setAvailableMandals] = useState([]);
  const [availableVillages, setAvailableVillages] = useState([]);
  const [formData, setFormData] = useState({
    name: 'Venky',
    mobile: '9346329784',
    email: 'venky@gmail.com',
    aadhar: '835299139595',
    issueDescription: '',
    village: '',
    status: 'open',
    submittedDate: new Date().toISOString(),
  });
  const [showToken, setShowToken] = useState(false);
  const [token, setToken] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const setInitialValues = (districtsData, mandalsData) => {
    setAvailableMandals(districtsData['Adilabad'] || []);
    const initialVillages = mandalsData['Pedanandipadu'] || [];
    setAvailableVillages(initialVillages);
    if (initialVillages.length > 0) {
      setFormData(prevData => ({ ...prevData, village: initialVillages[0] }));
    }
  };

  useEffect(() => {
    const loadJsonData = async () => {
      const districtFiles = ['Adilabad'];
      const districtsData = {};
      const mandalsData = {};

      for (const district of districtFiles) {
        try {
          const districtData = await import(`../Components/Data/mandal/${district}.json`);
          const mandalList = districtData.default.Get_mandals;
          districtsData[district] = mandalList.map(mandal => mandal.MandalName.trim());

          for (const mandal of mandalList) {
            const mandalName = mandal.MandalName.trim();
            try {
              const mandalData = await import(`../Components/Data/villages/${mandalName}.json`);
              mandalsData[mandalName] = mandalData.Get_villages.map(village => village.VillageName.trim());
            } catch (mandalError) {
              mandalsData[mandalName] = ["TEST VILLAGE"];
              console.error(`Error loading mandal data for ${mandalName}:`, mandalError);
            }
          }
        } catch (districtError) {
          console.error(`Error loading district data for ${district}:`, districtError);
        }
      }
      setDistricts(districtsData);
      setMandals(mandalsData);
      console.log("Loaded districts:", districtsData);
      console.log("Loaded mandals:", mandalsData);
      
      setInitialValues(districtsData, mandalsData);
    };

    loadJsonData();
  }, []);

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    const availableMandals = districts[district] || [];
    console.log("Available mandals for district:", availableMandals);
    setAvailableMandals(availableMandals);
    setSelectedMandal('');
    setAvailableVillages([]);
    setFormData(prevData => ({ ...prevData, village: '' }));
  };

  const handleMandalChange = (e) => {
    const mandal = e.target.value;
    setSelectedMandal(mandal);
    const villages = mandals[mandal] || [];
    console.log("Available villages for mandal:", villages);
    setAvailableVillages(villages);
    setFormData(prevData => ({ ...prevData, village: villages.length > 0 ? villages[0] : '' }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFileName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, mobile, email, aadhar, issueDescription, village } = formData;
    const generatedToken = generateToken(selectedDistrict, selectedMandal, village);
    setToken(generatedToken);
    setShowToken(true);
    handleQuerySubmit({ ...formData, token: generatedToken, selectedDistrict, selectedMandal, file, fileName });
    console.log(`Token: ${generatedToken}`);
    console.log(`Send token to email: ${email} and mobile: ${mobile}`);
  };

  const generateToken = (district, mandal, village) => {
    const stateCode = 'TG';
    const districtCode = district.substring(0, 3).toUpperCase();
    const mandalCode = mandal.substring(0, 3).toUpperCase();
    const areaType = 'RU';
    const villageCode = village.substring(0, 3).toUpperCase();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `${stateCode}${districtCode}${mandalCode}${areaType}${villageCode}${randomDigits}`;
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-center mb-4">Query Form</h2>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" defaultValue="Telangana" disabled>
                      <option>Telangana</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formDistrict">
                    <Form.Label>District</Form.Label>
                    <Form.Control as="select" value={selectedDistrict} onChange={handleDistrictChange}>
                      <option value="">Select District</option>
                      {Object.keys(districts).map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formMandal">
                    <Form.Label>Mandal</Form.Label>
                    <Form.Control as="select" value={selectedMandal} onChange={handleMandalChange} disabled={!selectedDistrict}>
                      <option value="">Select Mandal</option>
                      {availableMandals.map((mandal) => (
                        <option key={mandal} value={mandal}>
                          {mandal}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="village">
                    <Form.Label>Village</Form.Label>
                    <Form.Control as="select" value={formData.village} onChange={handleChange} disabled={!selectedMandal}>
                      <option value="">Select Village</option>
                      {availableVillages.map((village) => (
                        <option key={village} value={village}>
                          {village}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              

              <Row>
                <Col md={6}>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="mobile">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter your mobile number" value={formData.mobile} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="aadhar">
                    <Form.Label>Aadhar Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Aadhar number" value={formData.aadhar} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="issueDescription">
                <Form.Label>Issue Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Describe your issue" value={formData.issueDescription} onChange={handleChange} />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formImage">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleFileUpload} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formVideo">
                    <Form.Label>Upload Video (optional, max 30 sec)</Form.Label>
                    <Form.Control type="file" accept="video/*" onChange={handleFileUpload} />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit" className="mt-3">
                  Submit
                </Button>
              </div>
              
            </Form>
            {showToken && (
              <Alert variant="success" className="mt-3">
                Your token is: {token}
              </Alert>
            )}
          </div>
        </Col>
      </Row>
      <br />
      <Footer1 />
    </Container>
  );
};

export default Query;