import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import './CompareResult.css';

const CompareResult = () => {
  const location = useLocation();
  const { universities } = location.state || {};
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const safeUniversities = Array.isArray(universities) ? universities : [];

  const safeFeatures = (features) => Array.isArray(features) ? features.join(', ') : '';

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

  // Find the best university based on features and fees
  const getBestUniversity = () => {
    if (safeUniversities.length === 0) return null;

    // Example criteria: lowest fees and highest rating
    let bestUniversity = safeUniversities[0];
    for (const university of safeUniversities) {
      if (
        university.fees < bestUniversity.fees ||
        (university.fees === bestUniversity.fees && university.rating > bestUniversity.rating)
      ) {
        bestUniversity = university;
      }
    }
    return bestUniversity;
  };

  const bestUniversity = getBestUniversity();

  return (
    <div className="compare-result-container">
      <h1>COMPARISON TABLE</h1>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            {safeUniversities.map((university) => (
              <th key={university._id}>
                <img
                  src={`http://localhost:5000/images/${university.image}`}
                  alt={university.name}
                  className="university-logo"
                />
                <div>{university.name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Other rows */}
          <tr>
            <td className="feature-name">Price</td>
            {safeUniversities.map((university) => (
              <td key={university._id} className="info-box">
                {university.fees}
                <span className="sticker">₹2500 Off</span>
              </td>
            ))}
          </tr>
          <tr>
            <td className="feature-name">Course Name</td>
            {safeUniversities.map((university) => (
              <td key={university._id} className="info-box">
                <div className="course-details">
                  {university.courses.map((course, index) => (
                    <div key={index} className="course-info">
                      <div className="course-box">{course.name}</div>
                    </div>
                  ))}
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="feature-name">Course Duration</td>
            {safeUniversities.map((university) => (
              <td key={university._id} className="info-box">
                <div className="course-details">
                  {university.courses.map((course, index) => (
                    <div key={index} className="course-info">
                      <div className="course-box">{course.duration}</div>
                    </div>
                  ))}
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="feature-name">Features</td>
            {safeUniversities.map((university) => (
              <td key={university._id} className="info-box">
                {safeFeatures(university.features)}
                <button className="features-button">Features</button>
              </td>
            ))}
          </tr>
          {/* Other rows */}
          <tr>
            <td className="feature-name">Rating</td>
            {safeUniversities.map((university) => (
              <td key={university._id} className="info-box">
                {renderStars(university.rating)}
              </td>
            ))}
          </tr>
          <tr>
            <td className="feature-name">Placement Percentage</td>
            {safeUniversities.map((university) => (
              <td key={university._id} className="info-box">
                {renderEvaluationBar(university.placementPercentage)}
                <p>{university.placementPercentage}%</p>
              </td>
            ))}
          </tr>
          <tr>
            <td className="feature-name">Campus Size</td>
            {safeUniversities.map((university) => (
              <td key={university._id} className="info-box">
                {university.campusSize}
              </td>
            ))}
          </tr>
          <tr>
            <td className="feature-name">Contact</td>
            {safeUniversities.map((university) => (
              <td key={university._id} className="info-box">
                <div className="contact-icons">
                  <a href={`tel:${university.phone}`}><FaPhone className="contact-icon" /></a>
                  <a href={`https://wa.me/${university.whatsapp}`}><FaWhatsapp className="contact-icon" /></a>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="feature-name">History</td>
            {safeUniversities.map((university) => (
              <td key={university._id} className="info-box">
                <button className="view-history-button" onClick={() => handleImageClick(university)}>View History</button>
              </td>
            ))}
          </tr>
          <tr>
            <td className="feature-name"></td>
            {safeUniversities.map((university) => (
              <td key={university._id} className="info-box">
                <button className="book-seat-button">Book a Seat</button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <div className="key-comparison">
        <div className="comparison-box">
          <h2>Key Comparison</h2>
          <div className="comparison-item">
            <h3>Placement Percentage</h3>
            {safeUniversities.map((university) => (
              <div key={university._id}>
                <h4>{university.name}</h4>
                {renderEvaluationBar(university.placementPercentage)}
                <p>{university.placementPercentage}%</p>
              </div>
            ))}
          </div>
          <div className="comparison-item">
            <h3>Rating</h3>
            {safeUniversities.map((university) => (
              <div key={university._id}>
                <h4>{university.name}</h4>
                <p>Rating</p>{renderStars(university.rating)}
              </div>
            ))}
          </div>
          {bestUniversity && (
        <div className="summary-line">
          <h2>Best University Based on Features and Fees</h2>
          <p><strong>{bestUniversity.name}</strong> stands out among the compared universities due to its lower fees of <strong>${bestUniversity.fees}</strong> and its high rating of <strong>{bestUniversity.rating} stars</strong>. This combination of affordability and quality makes it the best choice for prospective students.</p>
          <p>Additionally, the university offers a comprehensive range of courses, excellent placement opportunities, and a well-equipped campus, making it an ideal choice for those seeking both value and excellence.</p>
        </div>
      )}
        </div>
        <button className="download-pdf-button">Download PDF</button>
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
