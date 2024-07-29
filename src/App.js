import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Home from './pages/Home';
import Compare from './pages/Compare';
import CompareMBA from './pages/compareMBA';
import University from './pages/University';
import LoginRegister from './components/LoginRegister';
// import Comparison from './pages/Comparison';
import CompareResult from './pages/CompareResult';
import UniversityDetail from './pages/UniversityDetail';
import ExpertList from './pages/ExpertList';
import './App.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleCompareClick = () => {
    setShowLogin(true);
  };

  return (
    <Router>
      {/* <Navbar /> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compareMBA" element={<CompareMBA  />} />
          <Route path="/compare" element={<Compare onCompareClick={handleCompareClick} />} />
          <Route path="/university/:id" element={<University />} />
          {/* <Route path="/compare/:id1/:id2" element={<Comparison />} /> */}
          <Route path="/experts" element={<ExpertList />} />
          <Route path="/university-detail" element={<UniversityDetail />} />
          <Route path="/compare-result" element={<CompareResult />} />
        </Routes>
      </div>
      {showLogin && <LoginRegister onClose={() => setShowLogin(false)} />}
    </Router>
  );
};

export default App;
