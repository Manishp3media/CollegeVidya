import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import './CompareResult.css';

const CompareResult = () => {
  const location = useLocation();
  const { universities } = location.state;
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div className="star-rating">
        {[...Array(totalStars)].map((_, index) => (
          <span key={index} className={index < rating ? 'star filled' : 'star'}>★</span>
        ))}
      </div>
    );
  };

  const renderEvaluationBar = (percentage) => (
    <div className="evaluation-bar">
      <div className="filled-bar" style={{ width: `${percentage}%` }}></div>
    </div>
  );

  const handleImageClick = (university) => {
    setSelectedUniversity(university);
  };

  const handleClosePopup = () => {
    setSelectedUniversity(null);
  };

  return (
    <div className="compare-result-container">
      <div className="university-cards">
        {universities.map((university, index) => (
          <div key={university._id} className={`university-card card-${index}`}>
            <h2>{university.name}</h2>
            <img
              src={`http://localhost:5000/images/${university.image}`}
              alt={university.name}
              className="university-image"
              onClick={() => handleImageClick(university)}
            />
            <div className="university-info">
              <div className="info-box">
                <h3>Location</h3>
                <p>{university.location}</p>
              </div>
              <div className="info-box">
                <h3>Established</h3>
                <p>{university.established}</p>
              </div>
              <div className="info-box">
                <h3>Contact</h3>
                <div className="contact-icons">
                  <FaPhone
                    className="icon"
                    onClick={() => window.open(`tel:${university.contact}`, '_self')}
                  />
                  <FaWhatsapp
                    className="icon"
                    onClick={() => window.open(`https://wa.me/${university.contact}`, '_blank')}
                  />
                </div>
              </div>
              <div className="info-box">
                <h3>Rating</h3>
                {renderStars(university.rating)}
              </div>
              <div className="info-box">
                <h3>Placement Percentage</h3>
                {renderEvaluationBar(university.placementPercentage)}
                <p>{university.placementPercentage}%</p>
              </div>
              <div className="info-box">
                <h3>Campus Size</h3>
                <p>{university.campusSize}</p>
              </div>
              <div className="info-box">
                <h3>Courses</h3>
                {university.courses.map((course, index) => (
                  <div key={index} className="course-info">
                    <div className="course-box">{course.name}</div>
                    <div className="course-box">{course.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="key-comparison">
        <h2>Key Comparison</h2>
        <div className="comparison-box">
          <h3>Placement Percentage</h3>
          {universities.map((university) => (
            <div key={university._id} className="comparison-item">
              <h4>{university.name}</h4>
              {renderEvaluationBar(university.placementPercentage)}
              <p>{university.placementPercentage}%</p>
            </div>
          ))}
        </div>
        <div className="comparison-box">
          <h3>Rating</h3>
          {universities.map((university) => (
            <div key={university._id} className="comparison-item">
              <h4>{university.name}</h4>
              {renderStars(university.rating)}
            </div>
          ))}
        </div>
      </div>
      {selectedUniversity && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-popup" onClick={handleClosePopup}>×</span>
            <img
              src={`http://localhost:5000/images/${selectedUniversity.image}`}
              alt={selectedUniversity.name}
              className="popup-image"
            />
            <h2>{selectedUniversity.name}</h2>
            <p>{selectedUniversity.history}</p>
            <button className="book-seat-button">Book a Seat</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareResult;
