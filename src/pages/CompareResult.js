import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPhone, FaWhatsapp,  FaQuestionCircle } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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

  const getBestUniversity = () => {
    if (safeUniversities.length === 0) return null;

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

  const downloadPDF = async () => {
    const doc = new jsPDF();

    const title = 'Comparison Report';
    const subtitle = 'Comparison of Selected Universities';

    // Title
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text(title, 14, 22);

    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(subtitle, 14, 32);

    const tableColumn = ['Feature', ...safeUniversities.map((uni) => uni.name)];
    const tableRows = [];

    // Adding rows
    tableRows.push([
      'Price',
      ...safeUniversities.map((uni) => `${uni.fees}`)
    ]);
    tableRows.push([
      'Course Name',
      ...safeUniversities.map((uni) =>
        uni.courses.map((course) => course.name).join(', ')
      )
    ]);
    tableRows.push([
      'Course Duration',
      ...safeUniversities.map((uni) =>
        uni.courses.map((course) => course.duration).join(', ')
      )
    ]);
    tableRows.push([
      'Features',
      ...safeUniversities.map((uni) => safeFeatures(uni.features))
    ]);
    tableRows.push([
      'Rating',
      ...safeUniversities.map((uni) => `${uni.rating} stars`)
    ]);
    tableRows.push([
      'Placement Percentage',
      ...safeUniversities.map((uni) => `${uni.placementPercentage}%`)
    ]);
    tableRows.push([
      'Campus Size',
      ...safeUniversities.map((uni) => uni.campusSize)
    ]);
    tableRows.push([
      'Approved By',
      ...safeUniversities.map((uni) => uni.approval)
    ]);

    doc.autoTable({
      startY: 40,
      head: [tableColumn],
      body: tableRows,
      styles: {
        fontSize: 10,
        halign: 'center',
        fillColor: '#f9f9f9',
        textColor: '#282828',
      },
      headStyles: {
        fillColor: [255, 215, 0],
        textColor: [0, 0, 0],
        fontSize: 12,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        0: { cellWidth: 40 }, // Column width for Feature
      },
      didDrawCell: function (data) {
        if (data.column.index > 0 && data.section === 'body' && data.row.index === 0) {
          const universityIndex = data.column.index - 1;
          const university = safeUniversities[universityIndex];
          if (university && university.imageBase64) {
            const { x, y, cell } = data;
            doc.addImage(
              university.imageBase64,
              'JPEG',
              cell.x + cell.padding('left'),
              cell.y + 2,
              15,
              15
            );
          }
        }
      },
    });

    // Best university section
    if (bestUniversity) {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 255);
      const bestUniText = [
        `Best University Based on Features and Fees:`,
        `Name: ${bestUniversity.name}`,
        `Fees: ${bestUniversity.fees}`,
        `Rating: ${bestUniversity.rating}`,
      ];
      bestUniText.forEach((text, index) => {
        doc.text(text, 14, doc.autoTable.previous.finalY + 10 + (index * 6));
      });
    }

    doc.save('comparison.pdf');
  };

  return (
    <div className="compare-result-container">
    <div className="header">
      <h1>COMPARISON TABLE</h1>
      <button id="ask-experts-button">
        <FaQuestionCircle className="icon" />
        Ask Experts
      </button>
    </div>
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
                <div className='fee-font'>
                {university.fees}
                </div>
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
            <td className="feature-name">Approved BY</td>
            {safeUniversities.map((university) => (
              <td key={university._id} className="info-box">
                {university.approval}
              </td>
            ))}
          </tr>
          <tr>
            <td className="feature-name">Contact</td>
            {safeUniversities.map((university) => (
              <td key={university._id} className="info-box">
                <div className="contact-icons">
                  <FaPhone className="contact-icon" />
                  <FaWhatsapp className="contact-icon" />
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
                <p>Rating: {renderStars(university.rating)}</p>
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
      </div>

      <button className="download-pdf-button" onClick={downloadPDF}>
        Download PDF
      </button>

      {selectedUniversity && (
        <div className="popup" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-popup" onClick={handleClosePopup}>&times;</span>
            <img
              src={`http://localhost:5000/images/${selectedUniversity.image}`}
              alt={selectedUniversity.name}
            />
            <h2>{selectedUniversity.name}</h2>
            <p>Fees: {selectedUniversity.fees}</p>
            <p>Rating: {renderStars(selectedUniversity.rating)}</p>
            <p>Placement Percentage: {selectedUniversity.placementPercentage}%</p>
            <p>Campus Size: {selectedUniversity.campusSize}</p>
            <p>Approved By: {safeFeatures(selectedUniversity.approval)}</p>
            <p>Features: {safeFeatures(selectedUniversity.features)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareResult;

