import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import '../assets/styles/SignUp.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    try {
      setError('');
      setLoading(true);
      await register(email, password, name);
      navigate('/browse');
    } catch (error) {
      console.error("Signup error:", error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email is already in use.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        default:
          setError('Failed to create an account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup__form">
        <h1>Sign Up</h1>
        
        {error && <div className="signup__error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="signup__formGroup">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>
          
          <div className="signup__formGroup">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
            />
          </div>
          
          <div className="signup__formGroup">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          
          <div className="signup__formGroup">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="signup__button"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="signup__login">
          <span>Already have an account? </span>
          <Link to="/login">Sign in now</Link>
        </div>
        
        <div className="signup__captcha">
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
          </small>
        </div>
      </div>
    </div>
  );
}

export default SignUp;