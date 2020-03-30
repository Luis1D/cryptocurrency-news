import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div id="Header">
            <header>
                <div className="logo-wrapper">
                    <h1>CND</h1>
                </div>
                <div className="nav-container">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/Article">Articles</NavLink>
                    <NavLink to="/Charts">Charts</NavLink>
                </div>
            </header>
        </div>
    )
}

export default Header;