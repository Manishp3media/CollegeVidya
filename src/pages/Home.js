// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/universities');
        console.log('Fetched Universities Data in Home.js:', response.data); // Log fetched data
        setUniversities(response.data);
      } catch (error) {
        console.error('Error fetching universities in Home.js:', error);
      }
    };

    fetchData();
  }, []);

  const filteredUniversities = universities.filter(university =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUniversityClick = (university) => {
    navigate('/university-detail', { state: { university } });
  };

  return (
    <div className="home-container">
      <Navbar />
      <header className="hero-section">
        <div className="hero-content">
          <h1>Find the Best Colleges and Universities</h1>
          <p>Compare colleges, courses, and find the best fit for you.</p>
          <input
            type="text"
            placeholder="Search for colleges or courses..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <section id="universities" className="universities-section">
        <h2>Featured Universities</h2>
        <div className="universities-container">
          {filteredUniversities.length === 0 ? (
            <p>No universities found</p>
          ) : (
            filteredUniversities.map(university => (
              <div 
                key={university._id} 
                className="university-card"
                onClick={() => handleUniversityClick(university)}
              >
                <img
                  src={`http://localhost:5000/images/${university.image}`}
                  alt={university.name}
                  className="university-image"
                />
                <label>{university.name}</label>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2023 College Vidya. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
