import React from 'react';
import { Link } from 'react-router-dom';
import './Component.css';

function Header() {
    return (
        <div className="header">
            <Link to="/">MAPLE.GG</Link>
        </div>
    );
}

export default Header;
