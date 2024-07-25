import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginRegister from '../components/LoginRegister';
import SelectUniversities from './SelectUniversities';
import './Compare.css';

const CompareMBA = () => {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [showLoginRegister, setShowLoginRegister] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSelectPopup, setShowSelectPopup] = useState(false);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/universities');
        setUniversities(response.data);
        setFilteredUniversities(response.data);
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
    if (selectedUniversities.length >= 2) {
      navigate('/compare-result', { state: { universities: selectedUniversities } });
    } else {
      alert('Please select at least two universities to compare.');
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredUniversities(
      universities.filter((u) => u.name.toLowerCase().includes(query))
    );
  };

  return (
    <div className="compare-container">
      {showLoginRegister && (
        <LoginRegister onClose={closePopup} onSuccess={handleLoginRegisterSuccess} />
      )}
      {showSelectPopup && (
        <>
          <div className="select-universities-container">
            <h2>SELECT UNIVERSITIES TO COMPARE</h2>
            <div className="search-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Search Colleges..."
                onChange={handleSearch}
              />
            </div>
            <SelectUniversities
              universities={filteredUniversities}
              selectedUniversities={selectedUniversities}
              setSelectedUniversities={setSelectedUniversities}
              onClose={closePopup}
              onContinue={handleContinue}
            />
          </div>
          <div className="mba-info">
            <h2>About MBA Courses</h2>
            <p>
              MBA (Master of Business Administration) programs are designed to equip students with
              comprehensive management and business skills. The curriculum typically includes
              core courses in areas such as finance, marketing, human resources, and operations
              management, along with specialized electives based on the student's interests.
            </p>
            <p>
              An MBA can be a valuable asset in advancing one's career, providing opportunities
              for leadership roles and higher salaries. Programs may vary in duration, format
              (full-time, part-time, or online), and specializations, allowing students to tailor
              their education to their career goals.
            </p>
            <h4>Details</h4>
            <ul>
              <li>
                MBA full form is Master of Business Administration. MBA course is a 2-year postgraduate level degree program focusing on management, business, and entrepreneurial concepts. MBA course curriculum is designed in a way that there is a combination of both theoretical and practical aspects; wherein classroom sessions and seminars take care of the theoretical knowledge and internships and workshops provide candidates with industrial exposure and real-time problems making them industry-ready.
              </li>
              <li>An MBA is designed to help graduates gain a better understanding of business management functions.</li>
            </ul>
            <p>
              Pursuing an MBA can also offer networking opportunities with professionals and alumni,
              contributing to personal and professional growth. It is important to research different
              programs to find one that aligns with your career aspirations and educational needs.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CompareMBA;
