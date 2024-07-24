import React, { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';
import rectangleImage from './Rectangle372.png';
import { Link } from 'react-router-dom';

const countries = {
  India: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'],
  USA: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
  Germany: ['Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia', 'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia']
};

const LoginRegister = ({ onClose, onSuccess }) => {
  const [formType, setFormType] = useState('register');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');

  const handleFormTypeChange = (type) => {
    setFormType(type);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setState('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = formType === 'login' 
      ? 'http://localhost:5000/api/login' 
      : 'http://localhost:5000/api/register';
    
    const data = formType === 'login' 
      ? { email, password, phone } 
      : { username, email, password, phone, gender, country, state, dob };

    try {
      const response = await axios.post(url, data);
      alert(`${formType.charAt(0).toUpperCase() + formType.slice(1)} successful!`);
      onSuccess();
    } catch (error) {
      alert('Error occurred!');
    }
  };

  return (
    <div className="login-register-overlay">
      <div className="login-register-popup">
        <div className="image-container">
          <img src={rectangleImage} alt="description" className="left-image" />
        </div>
        <div className="form-container">
        <Link to="/" className="home">
          <button onClick={onClose} className="login-register-close-button">&times;</button>
          </Link>
          <h2>{formType === 'login' ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit}>
            {formType !== 'login' && (
              <>
                <div>
                  <label>Full Name</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                  <label>Contact Number</label>
                  <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="country-state-row">
                  <div>
                    <label>Your Country</label>
                    <select value={country} onChange={handleCountryChange} required>
                      <option value="">Select Country</option>
                      {Object.keys(countries).map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  {country && (
                    <div>
                      <label>Your State</label>
                      <select value={state} onChange={(e) => setState(e.target.value)} required>
                        <option value="">Select State</option>
                        {countries[country].map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <div>
                    <label>Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label>Date of Birth</label>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                  </div>
                </div>
              </>
            )}
            <div>
              <label>Your Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">{formType === 'login' ? 'Login' : 'Register'}</button>
          </form>
          <button onClick={() => handleFormTypeChange(formType === 'login' ? 'register' : 'login')}>
            {formType === 'login' ? 'Switch to Register' : 'Switch to Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
