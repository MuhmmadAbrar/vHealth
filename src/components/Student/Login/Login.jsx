import React, { useState } from 'react';
import './Login.css';
import vitHealth from './vitHealth.jpg';
import VIT_Logo from './VIT_Logo.jpg';
import { supabase } from '../../../supabase'; // Adjust the path based on your file structure
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate(); // Change history to navigate
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
            if (!data || data.Password !== password.value) {
                setErrorMessage('Invalid username or password');
                return;
            }

            // Authentication successful
            setErrorMessage('');

            // Check the type of user
            if (data.employee_type === 'Student') {
                // Redirect to LandingPage with userId as URL parameter
                navigate(`/landing/${data.user_id}`); // Use navigate instead of history.push
            } else if (data.employee_type === 'Doctor') {
                // Redirect to DoctorDashboard
                navigate(`/doctor-dashboard/${data.user_id}`);
            } else {
                setErrorMessage('Unknown user type');
            }
=======

            // Redirect to landing page
            navigate('/landing'); // Use navigate instead of history.push
=======

            // Check the type of user
            // Check the type of user
            if (data.employee_type === 'Student') {
                // Redirect to LandingPage with userId as URL parameter
                navigate('/landing/${data.user_id}'); // Use navigate instead of history.push
            } else if (data.employee_type === 'Doctor') {
                // Redirect to DoctorDashboard
                navigate('/doctor-dashboard/${data.user_id}');
            }
            else if (data.employee_type === 'Receptionist') {
                // Redirect to ReceptionistDashboard
                navigate('/receptionist/${data.user_id}');
            } else {
                setErrorMessage('Unknown user type');
            }

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
