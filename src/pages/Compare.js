import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginRegister from '../components/LoginRegister';
import './Compare.css'; // Import the CSS file

const Compare = () => {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSelectPopup, setShowSelectPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/universities');
        setUniversities(response.data);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  const handleCompareClick = () => {
    if (!isAuthenticated) {
      setShowLoginRegister(true);
    } else {
      setShowSelectPopup(true);
    }
  };

  const handleLoginRegisterSuccess = () => {
    setIsAuthenticated(true);
    setShowLoginRegister(false);
    setShowSelectPopup(true);
  };

  const closePopup = () => {
    setShowLoginRegister(false);
    setShowSelectPopup(false);
  };

  const handleSelectUniversity = (university) => {
    if (selectedUniversities.includes(university)) {
      setSelectedUniversities(selectedUniversities.filter(u => u !== university));
    } else if (selectedUniversities.length < 2) {
      setSelectedUniversities([...selectedUniversities, university]);
    }
  };

  const handleContinue = () => {
    if (selectedUniversities.length === 2) {
      navigate('/compare-result', { state: { universities: selectedUniversities } });
    } else {
      alert('Please select two universities to compare.');
    }
  };

  const filteredUniversities = universities.filter(university =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="compare-container">
      <h1>University Comparison</h1>
      <button className="compare-button" onClick={handleCompareClick}>Compare Colleges</button>
      {showLoginRegister && (
        <LoginRegister onClose={closePopup} onSuccess={handleLoginRegisterSuccess} />
      )}
      {showSelectPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Select Universities to Compare</h2>
            <input
              type="text"
              placeholder="Search for a college..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="university-list">
              {filteredUniversities.map((university) => (
                <div key={university._id} className="university-option">
                  <input
                    type="checkbox"
                    checked={selectedUniversities.includes(university)}
                    onChange={() => handleSelectUniversity(university)}
                  />
                  <img
                    src={`http://localhost:5000/images/${university.image}`}
                    alt={university.name}
                    className="university-image"
                  />
                  <label>{university.name}</label>
                </div>
              ))}
            </div>
            <button className="continue-button" onClick={handleContinue}>Continue</button>
            <button className="close-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;
