<<<<<<< Updated upstream
import React, { useState, useEffect} from 'react';
=======
import React, { useState } from 'react';
>>>>>>> Stashed changes
import './login.css';
import vitHealth from './vitHealth.jpg';
import VIT_Logo from './VIT_Logo.jpg';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";


// Initialize Supabase client
const supabaseUrl = "https://ttwewexsotqwxisgnntg.supabase.co";
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0d2V3ZXhzb3Rxd3hpc2dubnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzAyNTAsImV4cCI6MjAyODI0NjI1MH0.08M6Zn1pEAYSb7KrJnxrYWsaiVlurYpdBpkqV2HfFoE'
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Login = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = event.target.elements;

        try {
            // Query user data from Supabase
            const { data, error } = await supabase
                .from('user')
                .select('*')
                .eq('user_id', username.value)
                .single();

            if (error) {
                throw error;
            }

            // Check if user exists and password matches
            if (!data || data.password !== password.value) {
                setErrorMessage('Invalid username or password');
                return;
            }

            // Authentication successful
            setErrorMessage('');
            // Redirect to landing page
            navigate('/landing');
        } catch (error) {
            console.error('Authentication error:', error.message);
            setErrorMessage('Authentication error. Please try again.');
        }
    };
    return (
        <div className="main-container">
            <div className="image-container">
                <img src={vitHealth} alt="Your Image Description" />
            </div>
            <div className="login-container">
                <img src={VIT_Logo} alt="vit_logo" />
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Login</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;