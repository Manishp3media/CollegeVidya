import React, { useState } from 'react';
import './SelectUniversities.css';

const SelectUniversities = ({ universities, selectedUniversities, setSelectedUniversities, onClose, onContinue }) => {
  const handleSelectUniversity = (university) => {
    if (selectedUniversities.length < 3 && !selectedUniversities.includes(university)) {
      setSelectedUniversities([...selectedUniversities, university]);
    }
  };

  const handleRemoveUniversity = (university) => {
    setSelectedUniversities(selectedUniversities.filter(u => u !== university));
  };

  const handleCancel = () => {
    setSelectedUniversities([]);
    document.querySelector('.selected-popup').classList.remove('show'); // Hide the popup
  };

  return (
    <div className="select-universities-container">
      {/* <h2>Select Universities to Compare</h2> */}
      <div className="university-table">
        <div className="table-header">
          <div className="table-header-item">Image</div>
          <div className="table-header-item">Name</div>
          <div className="table-header-item">Rating</div>
          <div className="table-header-item">Fees</div>
          <div className="table-header-item">Compare</div>
        </div>
        <div className="university-list">
          {universities.map((university) => (
            <div key={university._id} className="university-row">
              <div className="table-item image-item">
                <img
                  src={`http://localhost:5000/images/${university.image}`}
                  alt={university.name}
                  className="university-image"
                />
              </div>
              <div className="table-item name-item">{university.name}</div>
              <div className="table-item rating-item">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`star ${index < university.rating ? 'filled' : ''}`}>&#9733;</span>
                ))}
              </div>
              <div className="table-item fees-item">{university.fees}</div>
              <div className="table-item compare-item">
                <button 
                  className="select-button" 
                  onClick={() => handleSelectUniversity(university)}
                  disabled={selectedUniversities.includes(university)}
                >
                  {selectedUniversities.includes(university) ? 'Selected' : 'Select to Compare'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedUniversities.length > 0 && (
        <div className={`selected-popup show`}>
          <div className="selected-colleges">
            {[0, 1, 2].map((index) => (
              <div key={index} className={`selected-college-box ${!selectedUniversities[index] ? 'plus' : ''}`}>
                {selectedUniversities[index] ? (
                  <>
                    <img
                      src={`http://localhost:5000/images/${selectedUniversities[index].image}`}
                      alt={selectedUniversities[index].name}
                      className="selected-college-image"
                    />
                    <label>{selectedUniversities[index].name}</label>
                    <button onClick={() => handleRemoveUniversity(selectedUniversities[index])}>Remove</button>
                  </>
                ) : (
                  <label>{`College ${index + 1}`}</label>
                )}
              </div>
            ))}
          </div>
          {selectedUniversities.length === 3 && (
            <div className="popup-actions">
              <button className="continue-button" onClick={onContinue}>Continue</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectUniversities;
