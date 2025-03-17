import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signUp } from '../services/auth';
import './SignUpPage.css'; // Assuming you have a CSS file for styling

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await signUp(email, password);
            history.push('/'); // Redirect to home page after successful sign-up
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="sign-up-page">
            <h1>Sign Up</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSignUp}>
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;