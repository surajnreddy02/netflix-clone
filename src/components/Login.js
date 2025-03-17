import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../services/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            history.push('/'); // Redirect to home after successful login
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                {error && <p className="error">{error}</p>}
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;