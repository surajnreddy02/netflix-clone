import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import '../assets/styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      return setError('Please enter both email and password.');
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/browse');
    } catch (error) {
      console.error("Login error:", error);
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid email or password.');
          break;
        case 'auth/too-many-requests':
          setError('Too many login attempts. Please try again later.');
          break;
        default:
          setError('Failed to log in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__form">
        <h1>Sign In</h1>
        
        {error && <div className="login__error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="login__formGroup">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
            />
          </div>
          
          <div className="login__formGroup">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="login__button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="login__help">
          <div className="login__remember">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <span className="login__helpLink">Need help?</span>
        </div>
        
        <div className="login__signup">
          <span>New to Netflix? </span>
          <Link to="/signup">Sign up now</Link>
        </div>
        
        <div className="login__captcha">
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;