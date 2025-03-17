import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you have a CSS file for styling

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/">Netflix Clone</Link>
            </div>
            <nav className="header__nav">
                <Link to="/browse">Browse</Link>
                <Link to="/mylist">My List</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </nav>
        </header>
    );
};

export default Header;