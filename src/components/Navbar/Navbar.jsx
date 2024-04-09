import React from 'react';
import VIT_Logo from './VIT_Logo.jpg';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <img src={VIT_Logo} alt="College Logo" />
                <div className="profile">
                    <img id="profileImg" src="https://picsum.photos/200" alt="Profile Photo" />
                    <span className="username">John Doe</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
