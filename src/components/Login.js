import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ closePopup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { username, email, password, phone, gender, state, country });
      console.log(res.data); // handle token and user data
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <div className="popup login-popup">
      <div className="popup-content">
        <span className="close-popup" onClick={closePopup}>×</span>
        <h2>Login</h2>
        <form className="popup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
                    <input
            type="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
                              <input
            type="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
                              <input
            type="state"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
                              <input
            type="gender"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
