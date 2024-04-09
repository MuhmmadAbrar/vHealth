import React, { useState, useEffect } from 'react';
import './Landing.css';
import VIT_Logo from './VIT_Logo.jpg';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabase'; // Import your Supabase client instance

const Landing = () => {
    const { userId } = useParams(); // Get userId from URL parameter
    const [studentName, setStudentName] = useState('');
    const navigate = useNavigate(); // Use history for redirection after signout

    useEffect(() => {
        // Fetch student data from Supabase based on userId
        async function fetchStudentData() {
            try {
                const { data, error } = await supabase
                    .from('user')
                    .select('name')
                    .eq('user_id', userId)
                    .single();

                if (error) {
                    throw error;
                }

                if (data) {
                    setStudentName(data.name); // Set student name in state
                } else {
                    setStudentName('Unknown'); // If student not found, set name as 'Unknown'
                }
            } catch (error) {
                console.error('Error fetching student data:', error.message);
            }
        }

        fetchStudentData(); // Call the fetchStudentData function when the component mounts
    }, [userId]); // useEffect dependency on userId to refetch data when userId changes

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut(); // Sign out the user using Supabase auth
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="container">
                    <img src={VIT_Logo} alt="College Logo" />
                    <div className="profile">
                        <span className="username">{userId}</span>
                        <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
                    </div>
                </div>
            </nav>
            <div className="grid-container">
                <div className="grid-item">
                    <button><Link to={`/create-token/${userId}`}>Create Token</Link></button>
                </div>
                <div className="grid-item">
                    <button><Link to={`/medical-history/${userId}`}>View Medical History</Link></button>
                </div>
            </div>
            <p>Welcome, {studentName}!</p> {/* Display student name */}
        </div>
    );
};

export default Landing;
