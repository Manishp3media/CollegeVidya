import React, { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';

const LoginRegister = ({ onClose, onSuccess }) => {
  const [formType, setFormType] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleFormTypeChange = (type) => {
    setFormType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = formType === 'login' 
      ? 'http://localhost:5000/api/login' 
      : formType === 'register' 
      ? 'http://localhost:5000/api/register' 
      : 'http://localhost:5000/api/update-password';
    
    const data = formType === 'login' 
      ? { email, password } 
      : { username, email, password, phone };

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
        <button onClick={onClose} className="login-register-close-button">&times;</button>
        <h2>{formType === 'login' ? 'Login' : formType === 'register' ? 'Register' : 'Update Password'}</h2>
        <form onSubmit={handleSubmit}>
          {formType !== 'login' && (
            <div>
              <label>Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
          )}
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <button type="submit">{formType === 'login' ? 'Login' : formType === 'register' ? 'Register' : 'Update Password'}</button>
        </form>
        <button onClick={() => handleFormTypeChange(formType === 'login' ? 'register' : 'login')}>
          {formType === 'login' ? 'Switch to Register' : 'Switch to Login'}
        </button>
        {/* {formType === 'login' && (
          <button onClick={() => handleFormTypeChange('update-password')}>
            Forget Password
          </button>
        )} */}
      </div>
    </div>
  );
};

export default LoginRegister;
