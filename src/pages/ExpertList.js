import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExpertProfile.css';

const ExpertList = () => {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/experts')
      .then(response => {
        console.log('Data fetched:', response.data); // Log the fetched data
        setExperts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="expert-list-container">
      <div className="Heading">
        <h1>Ask Our Experts</h1>
      </div>
      <div className="expert-list">
        {experts.map(expert => (
          <div key={expert._id} className="expert-card">
            <div className="front">
              <img src={`http://localhost:5000/images/${expert.image}`} alt={expert.name} className="expert-image" />
              <h2>{expert.name}</h2>
              <p>{expert.designation}</p>
            </div>
            <div className="back">
              <img src={`http://localhost:5000/images/${expert.image}`} alt={expert.name} className="expert-image-small" />
              <p>Experience: {expert.experience} years</p>
              <p>Contact: {expert.contact}</p>
              <p>Email: {expert.email}</p>
              <p>{expert.bio}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="contact-box">
        <h2>Contact Us</h2>
        <p>Phone: +123456789</p>
        <p>Email: contact@example.com</p>
        <p>Address: 1234 Street Name, City, Country</p>
      </div>
      <div className="ai-bar">
        <h2>Need Help?</h2>
        <p>Our AI assistant is here to help you.</p>
        {/* Add AI assistant functionality here */}
      </div>
      <footer>
        <p>&copy; 2024 College Vidya. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ExpertList;
