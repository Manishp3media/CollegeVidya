import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginRegister from '../components/LoginRegister';
import SelectUniversities from './SelectUniversities';
import './Compare.css';

const Compare = () => {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [showLoginRegister, setShowLoginRegister] = useState(true); // Show Login/Register popup immediately
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSelectPopup, setShowSelectPopup] = useState(false);
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

  useEffect(() => {
    if (isAuthenticated) {
      setShowLoginRegister(false);
      setShowSelectPopup(true);
    }
  }, [isAuthenticated]);

  const handleLoginRegisterSuccess = () => {
    setIsAuthenticated(true);
  };

  const closePopup = () => {
    setShowLoginRegister(false);
    setShowSelectPopup(false);
    setSelectedUniversities([]);
  };

  const handleContinue = () => {
    if (selectedUniversities.length === 3) {
      navigate('/compare-result', { state: { universities: selectedUniversities } });
    } else {
      alert('Please select three universities to compare.');
    }
  };

  return (
    <div className="compare-container">
      {showLoginRegister && (
        <LoginRegister onClose={closePopup} onSuccess={handleLoginRegisterSuccess} />
      )}
      {showSelectPopup && (
        <SelectUniversities
          universities={universities}
          selectedUniversities={selectedUniversities}
          setSelectedUniversities={setSelectedUniversities}
          onClose={closePopup}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

export default Compare;
