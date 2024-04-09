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
                    <h2>Search-Ticket</h2>
                </div>
                <div className="grid-item">
                    <div className="search-ticket">
                        <div className="searchTicketField"><input type="text" placeholder="Enter Token Number" /></div>
                        <div className="searchButton"><button className="green-button">Search</button></div>
                    </div>
                </div>
                <div className="grid-item">
                    <h2>View/Create Tokens</h2>
                </div>
                <div className="grid-item">
                    <div className="viewCreateButtons">
                        <button><Link to="/create-token">Create Token</Link></button>
                        <button className="green-button">View History</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
