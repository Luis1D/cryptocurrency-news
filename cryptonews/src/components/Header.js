import React from 'react';
import Search from './Search';

const Header = () => {
    return (
        <div id="Header">
            <header>
                <div className="logo-wrapper">
                    <img 
                        src={ require('../assets/astronaut.svg') }
                        alt="astronaut"
                        className="astronaut-logo"
                    />
                    <h1>Crptoz</h1>
                </div>
                <Search />
            </header>
        </div>
    )
}

export default Header;