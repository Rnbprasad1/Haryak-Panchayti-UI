import React, { useState } from 'react';
import './Query.css';
import allurisitharamarajuMandal from './Data/mandal/allurisitharamaraju.json';
import palnaduMandals from './Data/mandal/palnadu.json';
import EluruMandals from './Data/mandal/Eluru.json';
import PrakasamMandals from './Data/mandal/Prakasam.json';
import vinukondaMandalVillages from './Data/villages/vinukondaVillagesList.json';
import ananthagiriVillages from './Data/villages/ananthagiri.json';
import addateegalaVillages from './Data/villages/addateegala.json';
import AchampetaVillages from './Data/villages/Achampeta.json';
import AmaravatiVillages from './Data/villages/Amaravati.json';
import ArakuValleyVillages from './Data/villages/ArakuValley.json';
import BellamkondaVillages from './Data/villages/Bellamkonda.json';
import ChilakaluripetVillages from './Data/villages/Chilakaluripet.json';
import ChintapalleVillages from './Data/villages/Chintapalle.json';
import ChinturVillages from './Data/villages/Chintur.json';
import DachepalliVillages from './Data/villages/Dachepalli.json';
import DevipatnamVillages from './Data/villages/Devipatnam.json';
import DurgiVillages from './Data/villages/Durgi.json';
import EdlapaduVillages from './Data/villages/Edlapadu.json';
import ArdhaveeduVillages from './Data/villages/Ardhaveedu.json';
import BestavaripetaVillages from './Data/villages/Bestavaripeta.json';
import ChadrasekarapuramVillages from './Data/villages/Chadrasekarapuram.json';
import ChimakurthiVillages from './Data/villages/Chimakurthi.json';
import CumbumVillages from './Data/villages/Cumbum.json';

const QueryForm = () => {
  const [stateQuery, setStateQuery] = useState('');
  const [districtQuery, setDistrictQuery] = useState('');
  const [mandalQuery, setMandalQuery] = useState('');
  const [ruralQuery, setRuralQuery] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [isAadharValid, setIsAadharValid] = useState(true);
  const [issueDescription, setIssueDescription] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredMandals, setFilteredMandals] = useState([]);
  const [filteredRural, setFilteredRural] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const states = ['Andhra Pradesh'];

  const districts = [
    'Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 
    'Kurnool', 'Prakasam', 'Srikakulam', 'Sri Potti Sriramulu Nellore', 
    'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa', 
    'Alluri Sitharama Raju', 'Anakapalli', 'Annamayya', 'Bapatla', 
    'Dr. B.R. Ambedkar Konaseema', 'Eluru', 'Kakinada', 'Nandyal', 
    'NTR', 'Palnadu', 'Parvathipuram Manyam', 'Tirupati', 'Sri Sathya Sai'
  ];

  // Mandals
  const allurisitharamarajuMandalList = allurisitharamarajuMandal.Get_mandals.map(item => item.MandalName);
  const palnaduMandalList = palnaduMandals.Get_mandals.map(item => item.MandalName);
  const EluruMandalList = EluruMandals.Get_mandals.map(item => item.MandalName);
  const PrakasamMandalList = PrakasamMandals.Get_mandals.map(item => item.MandalName);

  // Villages
  const vinukondaVillagesList = vinukondaMandalVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const ananthagiriVillagesList = ananthagiriVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const addateegalaVillagesList = addateegalaVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const AchampetaVillagesList = AchampetaVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const AmaravatiVillagesList = AmaravatiVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const ArakuValleyVillagesList = ArakuValleyVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const BellamkondaVillagesList = BellamkondaVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const ChilakaluripetVillagesList = ChilakaluripetVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const ChintapalleVillagesList = ChintapalleVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const ChinturVillagesList = ChinturVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const ArdhaveeduVillagesList = ArdhaveeduVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  
  const DachepalliVillagesList = DachepalliVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const DevipatnamVillagesList = DevipatnamVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const DurgiVillagesList = DurgiVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const EdlapaduVillagesList = EdlapaduVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const BestavaripetaVillagesList = BestavaripetaVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const ChadrasekarapuramVillagesList = ChadrasekarapuramVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const ChimakurthiVillagesList = ChimakurthiVillages.Lgdrvmaster.map(item => item.Revenue_Name);
  const CumbumVillagesList = CumbumVillages.Lgdrvmaster.map(item => item.Revenue_Name);

  const handleStateInputChange = (event) => {
    const value = event.target.value;
    console.log('State input changed:', value);
    setStateQuery(value);
    if (value.length > 0) {
      const filtered = states.filter(state => 
        state.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStates(filtered);
    } else {
      setFilteredStates([]);
    }
    // Reset district, mandal, and rural queries
    setDistrictQuery('');
    setMandalQuery('');
    setRuralQuery('');
    setFilteredDistricts([]);
    setFilteredMandals([]);
    setFilteredRural([]);
  };

  const handleDistrictInputChange = (event) => {
    const value = event.target.value;
    console.log('District input changed:', value);
    setDistrictQuery(value);
    if (value.length > 0) {
      const filtered = districts.filter(district => 
        district.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts([]);
    }
    // Reset mandal and rural queries
    setMandalQuery('');
    setRuralQuery('');
    setFilteredMandals([]);
    setFilteredRural([]);
  };

  const handleMandalInputChange = (event) => {
    const value = event.target.value;
    console.log('Mandal input changed:', value);
    setMandalQuery(value);
    if (value.length > 1) {
      let filtered = [];
      if (districtQuery === 'Alluri Sitharama Raju') {
        filtered = allurisitharamarajuMandalList.filter(mandal => 
          mandal.toLowerCase().includes(value.toLowerCase())
        );
      } else if (districtQuery === 'Palnadu') {
        filtered = palnaduMandalList.filter(mandal => 
          mandal.toLowerCase().includes(value.toLowerCase())
        );
      } else if (districtQuery === 'Eluru') {
        filtered = EluruMandalList.filter(mandal => 
          mandal.toLowerCase().includes(value.toLowerCase())
        );
      } else if (districtQuery === 'Prakasam') {
        filtered = PrakasamMandalList.filter(mandal => 
          mandal.toLowerCase().includes(value.toLowerCase())
        );
      }
      setFilteredMandals(filtered);
    } else {
      setFilteredMandals([]);
    }
    // Reset rural query
    setRuralQuery('');
    setFilteredRural([]);
  };

  const handleRuralInputChange = (event) => {
    const value = event.target.value;
    console.log('Rural input changed:', value);
    setRuralQuery(value);
    if (value.length > 0) {
      let filtered = [];
      if (mandalQuery === 'Vinukonda') {
        filtered = vinukondaVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Ananthagiri') {
        filtered = ananthagiriVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Addateegala') {
        filtered = addateegalaVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Achampeta') {
        filtered = AchampetaVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Amaravati') {
        filtered = AmaravatiVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Araku Valley') {
        filtered = ArakuValleyVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Bellamkonda') {
        filtered = BellamkondaVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Chilakaluripet') {
        filtered = ChilakaluripetVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Chintapalle') {
        filtered = ChintapalleVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Chintur') {
        filtered = ChinturVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Ardhaveedu') {
        filtered = ArdhaveeduVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Dachepalli') {
        filtered = DachepalliVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Devipatnam') {
        filtered = DevipatnamVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Durgi') {
        filtered = DurgiVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Edlapadu') {
        filtered = EdlapaduVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Bestavaripeta') {
        filtered = BestavaripetaVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Chadrasekarapuram') {
        filtered = ChadrasekarapuramVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Chimakurthi') {
        filtered = ChimakurthiVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      } else if (mandalQuery === 'Cumbum') {
        filtered = CumbumVillagesList.filter(rural => 
          rural.toLowerCase().includes(value.toLowerCase())
        );
      }
      setFilteredRural(filtered);
    } else {
      setFilteredRural([]);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAadharChange = (event) => {
    const value = event.target.value;
    setAadhar(value);
    setIsAadharValid(validateAadhar(value));
  };

  const handleIssueDescriptionChange = (event) => {
    setIssueDescription(event.target.value);
  };

  const validateAadhar = (aadhar) => {
    return /^\d{12}$/.test(aadhar);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!stateQuery || !districtQuery || !mandalQuery || !ruralQuery) {
      setErrorMessage('Please fill in all the required fields.');
      return;
    }
    setErrorMessage('');
    
    // Generate the unique 16-digit code
    const stateCode = 'AP';
    const districtCode = districts.indexOf(districtQuery).toString().padStart(3, '0');
    const mandalCode = mandalQuery.substring(0, 3).toUpperCase();
    const ruralCode = ruralQuery.substring(0, 3).toUpperCase();
    const currentDate = new Date();
    const dateCode = `${currentDate.getDate()} ${currentDate.getMonth() + 1}${currentDate.getFullYear() % 100}`;

    const uniqueCode = `${stateCode}${districtCode}${mandalCode}${ruralCode}${dateCode}`;
    setGeneratedCode(uniqueCode);

    // You can perform further form submission logic here
  };

  const handleDropdownClick = (setter, value) => {
    setter(value);
    setFilteredStates([]);
    setFilteredDistricts([]);
    setFilteredMandals([]);
    setFilteredRural([]);
  };

  return (
    <div className="query-form">
      <form onSubmit={handleSubmit}>
        <label>
          State:
          <input
            type="text"
            value={stateQuery}
            onChange={handleStateInputChange}
            placeholder="Enter state"
          />
          {filteredStates.length > 0 && (
            <ul className="dropdown">
              {filteredStates.map((state, index) => (
                <li key={index} onClick={() => handleDropdownClick(setStateQuery, state)}>
                  {state}
                </li>
              ))}
            </ul>
          )}
        </label>
        <label>
          District:
          <input
            type="text"
            value={districtQuery}
            onChange={handleDistrictInputChange}
            placeholder="Enter district"
          />
          {filteredDistricts.length > 0 && (
            <ul className="dropdown">
              {filteredDistricts.map((district, index) => (
                <li key={index} onClick={() => handleDropdownClick(setDistrictQuery, district)}>
                  {district}
                </li>
              ))}
            </ul>
          )}
        </label>
        <label>
          Mandal:
          <input
            type="text"
            value={mandalQuery}
            onChange={handleMandalInputChange}
            placeholder="Enter mandal"
          />
          {filteredMandals.length > 0 && (
            <ul className="dropdown">
              {filteredMandals.map((mandal, index) => (
                <li key={index} onClick={() => handleDropdownClick(setMandalQuery, mandal)}>
                  {mandal}
                </li>
              ))}
            </ul>
          )}
        </label>
        <label>
          Rural:
          <input
            type="text"
            value={ruralQuery}
            onChange={handleRuralInputChange}
            placeholder="Enter rural"
          />
          {filteredRural.length > 0 && (
            <ul className="dropdown">
              {filteredRural.map((rural, index) => (
                <li key={index} onClick={() => handleDropdownClick(setRuralQuery, rural)}>
                  {rural}
                </li>
              ))}
            </ul>
          )}
        </label>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} placeholder="Enter name" />
        </label>
        <label>
          Mobile:
          <input type="text" value={mobile} onChange={handleMobileChange} placeholder="Enter mobile" />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter email" />
        </label>
        <label>
          Aadhar:
          <input type="text" value={aadhar} onChange={handleAadharChange} placeholder="Enter Aadhar" />
          {!isAadharValid && <span className="error">Invalid Aadhar number</span>}
        </label>
        <label>
          Issue Description:
          <textarea value={issueDescription} onChange={handleIssueDescriptionChange} placeholder="Describe the issue"></textarea>
        </label>
        <button type="submit">Submit</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      {generatedCode && (
        <div className="generated-code">
          <h3>Generated Code: {generatedCode}</h3>
        </div>
      )}
    </div>
  );
}

export default QueryForm;

