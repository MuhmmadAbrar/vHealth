import React, { useState } from 'react';
import VIT_Logo from './VIT_Logo.jpg';
import { useNavigate, useParams } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate(); // Change history to navigate
    const [errorMessage, setErrorMessage] = useState('');
    const { userId } = useParams(); // Access userId from URL params

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = event.target.elements;
        
        try {
            // Implement your login logic here
        } catch (error) {
            console.error('Authentication error:', error.message);
            setErrorMessage('Authentication error. Please try again.');
        }
    };

    return (
        <div className="main-container">
            <div className="login-container">
                <img src={VIT_Logo} alt="vit_logo" />
                <form onSubmit={handleFormSubmit}>
                    {/* Hidden input field to store userId */}
                    <input type="hidden" name="userId" value={userId} />
                    <div className="form-group">
                        <label htmlFor="regNo">Register Number:</label>
                        {/* Input field with readOnly attribute */}
                        <input type="text" id="regNo" name="regNo" value={userId} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Description">Description</label>
                        <input type="Description" id="password" name="description" required />
                    </div>
                    <button type="submit">Login</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;

