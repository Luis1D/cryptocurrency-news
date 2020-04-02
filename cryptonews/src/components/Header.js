import React from 'react';
import Search from './Search';
// import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div id="Header">
            <header>
                <div className="logo-wrapper">
                    <h1>CND</h1>
                </div>
                {/* <Search /> */}
                {/* <div className="nav-container">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    <NavLink className="nav-link" to="/Article">Articles</NavLink>
                    <NavLink className="nav-link" to="/Charts">Charts</NavLink>
                </div> */}
            </header>
        </div>
    )
}

export default Header;