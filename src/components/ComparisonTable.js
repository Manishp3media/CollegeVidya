// src/components/ComparisonTable.js
import React from 'react';

const ComparisonTable = ({ comparisons }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>University</th>
          <th>Program</th>
          <th>Duration</th>
          <th>Fees</th>
        </tr>
      </thead>
      <tbody>
        {comparisons.map(comparison => (
          <tr key={comparison._id}>
            <td data-label="University">{comparison.university.name}</td>
            <td data-label="Program">{comparison.name}</td>
            <td data-label="Duration">{comparison.duration}</td>
            <td data-label="Fees">{comparison.fees}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ComparisonTable;
