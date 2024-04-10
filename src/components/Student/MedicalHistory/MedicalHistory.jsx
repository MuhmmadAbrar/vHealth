import React, { useEffect, useState } from 'react';
import './MedicalHistory.css'; // Make sure the path is correct
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from 'react-router-dom';
import VIT_Logo from './VIT_Logo.jpg';

// Initialize Supabase client
const supabaseUrl = "https://ttwewexsotqwxisgnntg.supabase.co";
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0d2V3ZXhzb3Rxd3hpc2dubnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzAyNTAsImV4cCI6MjAyODI0NjI1MH0.08M6Zn1pEAYSb7KrJnxrYWsaiVlurYpdBpkqV2HfFoE'
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MedicalHistory = () => {
    const { userId } = useParams(); // Get userId from URL parameter
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [studentName, setStudentName] = useState('');
    const navigate = useNavigate(); // Use navigate for redirection after signout

    useEffect(() => {
        // Fetch medical history data from Supabase
        const fetchMedicalHistory = async () => {
            let { data, error } = await supabase
                .from('history') // Adjust this to your Supabase table name
                .select('*') // Adjust according to the fields you need
                .eq('regNo', userId);

            if (error) {
                console.error("Error fetching medical history", error);
            } else {
                setMedicalHistory(data);
            }
        };

        fetchMedicalHistory();
    }, [userId]);

    useEffect(() => {
        // Fetch student data from Supabase based on userId
        const fetchStudentData = async () => {
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
        };

        fetchStudentData();
    }, [userId]);

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
            <div className="main-container">
                <h2>Medical History</h2>
                <div className="container">
                    <table id="medicalHistoryTable">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Token No</th>
                                <th>Status</th>
                                <th>Reason of Visit</th>
                                <th>Remarks</th>
                                <th>Prescription</th>
                                <th>Date of Visit</th>
                                <th>Time of Visit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicalHistory.map((record, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{record.token}</td>
                                    <td>{record.status}</td>
                                    <td>{record.reason}</td>
                                    <td>{record.remarks}</td>
                                    <td>{record.prescription}</td>
                                    <td>{record.date}</td>
                                    <td>{record.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MedicalHistory;
