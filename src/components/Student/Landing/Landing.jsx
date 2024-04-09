import React, { useState } from 'react';
import './Landing.css';
import VIT_Logo from './VIT_Logo.jpg';
import { Link } from 'react-router-dom';

const Landing = () => {
    const [isCreateTokenVisible, setIsCreateTokenVisible] = useState(false);

    const handleCreateTokenClick = () => {
        setIsCreateTokenVisible(true);
    };

    const handleCancelCreateTokenClick = () => {
        setIsCreateTokenVisible(false);
    };

    return (
        <div>
            <div className="grid-container">
                <div className="grid-item">
                    <button><Link to="/create-token">Create Token</Link></button>
                </div>
                <div className="grid-item">
                    <button><Link to="/medical-history">View Medical History</Link></button>
                </div>
            </div>
        </div>
    );
};

export default Landing;
