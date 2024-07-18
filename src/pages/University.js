// src/pages/University.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const University = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/universities/${id}`)
      .then(response => setUniversity(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!university) return <div>Loading...</div>;

  return (
    <div>
      <h1>{university.name}</h1>
      <p>{university.location}</p>
      <p>Established: {university.established}</p>
      <div>
        {university.programs.map(program => (
          <div key={program._id}>
            <h2>{program.name}</h2>
            <p>Duration: {program.duration}</p>
            <p>Fees: {program.fees}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default University;
