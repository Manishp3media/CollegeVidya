import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = ({ closePopup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isForgetPassword, setIsForgetPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isForgetPassword ? 'http://localhost:5000/update-password' : 'http://localhost:5000/register';
    try {
      const res = await axios.post(endpoint, { username, password });
      console.log(res.data); // handle token and user data
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  const toggleForgetPassword = () => {
    setIsForgetPassword(!isForgetPassword);
  };

  return (
    <div className="popup register-popup">
      <div className="popup-content">
        <span className="close-popup" onClick={closePopup}>×</span>
        <h2>{isForgetPassword ? 'Update Password' : 'Register'}</h2>
        <form className="popup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isForgetPassword ? 'Update Password' : 'Register'}</button>
        </form>
        <button className="toggle-forget-password" onClick={toggleForgetPassword}>
          {isForgetPassword ? 'Back to Register' : 'Forget Password'}
        </button>
      </div>
    </div>
  );
};

export default Register;
