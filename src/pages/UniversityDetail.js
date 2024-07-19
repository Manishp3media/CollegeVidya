// src/pages/UniversityDetail.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import './UniversityDetail.css'; // Create this CSS file for styling

const UniversityDetail = () => {
  const location = useLocation();
  const { university } = location.state; // Get the university data from the location state

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

  return (
    <div className="university-detail-container">
      <div className="university-detail-card">
        <h2>{university.name}</h2>
        <img
          src={`http://localhost:5000/images/${university.image}`}
          alt={university.name}
          className="university-detail-image"
        />
        <div className="university-detail-info">
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
          <div className="info-box">
            <h3>History</h3>
            <p>{university.history}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetail;
