// src/components/UniversityList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UniversityList = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/universities')
      .then(response => setUniversities(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="university-list">
      {universities.map(university => (
        <div key={university._id}>
          <Link to={`/university/${university._id}`}>{university.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default UniversityList;
