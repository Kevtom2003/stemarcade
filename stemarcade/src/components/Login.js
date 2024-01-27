import React from 'react';
import './Login.css'; // Create a CSS file for styling

const Login = () => {
  return (
    <div className="login-container">
      <h2>Retro Arcade Login</h2>
      <form>
        <input type="text" className="login-input" placeholder="Username" required />
        <input type="password" className="login-input" placeholder="Password" required />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;