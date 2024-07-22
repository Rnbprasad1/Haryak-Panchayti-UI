import React, { useState, useEffect, useContext } from 'react';
import { Form, Container, Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { DataContext } from '../Components/AdminComponents/DataContext';
import Footer1 from './Footer1';
import Select from 'react-select';

const Query = () => {
  const { handleQuerySubmit } = useContext(DataContext);

  const [districts, setDistricts] = useState({});
  const [mandals, setMandals] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedMandal, setSelectedMandal] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [formData, setFormData] = useState({
    name: 'Venky',
    mobile: '9346329784',
    email: 'venky@gmail.com',
    aadhar: '835299139595',
    issueDescription: '',
    status: 'open',
    submittedDate: new Date().toISOString(),
  });
  const [showToken, setShowToken] = useState(false);
  const [token, setToken] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const loadJsonData = async () => {
      const districtFiles = [ 'Addanki', 'Amruthalur', 'Ballikurava', 'Bapatla', 'Bhattiprolu', 'Cherukupalle', 'Chinaganjam', 'Inkollu',
        'J. Panguluru', 'Karamchedu', 'Karlapalem', 'Kollur', 'Korisapadu', 'Martur', 'Nagaram', 'Nizampatnam', 'Parchur',
        'Pittalavanipalem', 'Repalle', 'Santhamaguluru', 'Tsundur', 'Vemuru', 'Vetapalem', 'Yeddanapudi'];
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
              mandalsData[mandalName] = mandalData.Get_villages.map(village => ({
                value: village.VillageName.trim(),
                label: village.VillageName.trim(),
                mandal: mandalName
              }));
            } catch (mandalError) {
              mandalsData[mandalName] = [{ value: "TEST VILLAGE", label: "TEST VILLAGE", mandal: mandalName }];
              console.error(`Error loading mandal data for ${mandalName}:`, mandalError);
            }
          }
        } catch (districtError) {
          console.error(`Error loading district data for ${district}:`, districtError);
        }
      }
      setDistricts(districtsData);
      setMandals(mandalsData);
    };

    loadJsonData();
  }, []);

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setSelectedMandal(null);
    setSelectedVillage(null);
  };

  const handleVillageSelect = (selectedOption) => {
    setSelectedVillage(selectedOption);
    setSelectedMandal({ value: selectedOption.mandal, label: selectedOption.mandal });
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
    if (!selectedDistrict || !selectedMandal || !selectedVillage) {
      alert("Please select Village before submitting.");
      return;
    }
    const generatedToken = generateToken(selectedDistrict.value, selectedMandal.value, selectedVillage.value);
    setToken(generatedToken);
    setShowToken(true);
    handleQuerySubmit({
      ...formData,
      token: generatedToken,
      selectedDistrict: selectedDistrict.value,
      selectedMandal: selectedMandal.value,
      village: selectedVillage.value,
      file,
      fileName
    });
  };

  const generateToken = (district, mandal, village) => {
    const stateCode = 'AP';
    const districtCode = district.substring(0, 3).toUpperCase();
    const mandalCode = mandal.substring(0, 3).toUpperCase();
    const areaType = 'RU';
    const villageCode = village.substring(0, 3).toUpperCase();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `${stateCode}${districtCode}${mandalCode}${areaType}${villageCode}${randomDigits}`;
  };

  const villageOptions = selectedDistrict
    ? Object.values(mandals).flat().filter(village => districts[selectedDistrict.value].includes(village.mandal))
    : [];

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg">
            <Card.Header className="bg-primary text-white">
              <h2 className="text-center mb-0">Query Submission Form</h2>
            </Card.Header>
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group controlId="formState">
                      <Form.Label>State</Form.Label>
                      <Form.Control as="select" defaultValue="Andhra Pradesh" disabled>
                        <option>Andhra Pradesh</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formDistrict">
                      <Form.Label>Assembly constituency <span className="text-danger">*</span></Form.Label>
                      <Select
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        options={Object.keys(districts).map(district => ({ value: district, label: district }))}
                        placeholder="Select constituency"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                <Col md={6}>
                    <Form.Group controlId="formMandal">
                      <Form.Label>Mandal <span className="text-danger">*</span></Form.Label>
                      <Select
                        value={selectedMandal}
                        onChange={(option) => setSelectedMandal(option)}
                        options={selectedDistrict ? districts[selectedDistrict.value].map(mandal => ({ value: mandal, label: mandal })) : []}
                        placeholder="Select Mandal"
                        isSearchable
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formVillage">
                     <Form.Label>Village <span className="text-danger">*</span></Form.Label>
                      <Select
                        value={selectedVillage}
                        onChange={handleVillageSelect}
                        options={villageOptions}
                        placeholder="Search and select village"
                        isSearchable
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="mobile">
                      <Form.Label>Mobile Number <span className="text-danger">*</span></Form.Label>
                      <Form.Control type="tel" placeholder="Enter your mobile number" value={formData.mobile} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                      <Form.Control type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="aadhar">
                      <Form.Label>Aadhar Number <span className="text-danger">*</span></Form.Label>
                      <Form.Control type="text" placeholder="Enter your Aadhar number" value={formData.aadhar} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="issueDescription" className="mb-4">
                  <Form.Label>Issue Description <span className="text-danger">*</span></Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Please describe your issue in detail" value={formData.issueDescription} onChange={handleChange} required />
                </Form.Group>

                <Row className="mb-4">
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

                <div className="d-flex justify-content-center">
                  <Button variant="primary" type="submit" size="lg" className="px-5">
                    Submit Query
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          {showToken && (
            <Alert variant="success" className="mt-4">
              <Alert.Heading>Query Submitted Successfully!</Alert.Heading>
              <p className="mb-0">Your token number is: <strong>{token}</strong></p>
              <p>Please keep this token for future reference.</p>
            </Alert>
          )}
        </Col>
      </Row>
      <Footer1 />
    </Container>
  );
};

export default Query;
