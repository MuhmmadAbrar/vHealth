import React, { useEffect, useState } from 'react';
import './DoctorDashboard.css'; // Make sure the path is correct
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';
import VIT_Logo from './VIT_Logo.jpg';
import {useParams } from 'react-router-dom';

// Initialize Supabase client
const supabaseUrl = "https://ttwewexsotqwxisgnntg.supabase.co";
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0d2V3ZXhzb3Rxd3hpc2dubnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzAyNTAsImV4cCI6MjAyODI0NjI1MH0.08M6Zn1pEAYSb7KrJnxrYWsaiVlurYpdBpkqV2HfFoE'
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DoctorDashboard = () => {
    const [patientData, setPatientData] = useState([]);
    const [doctorName, setDoctorName] = useState('');
    const navigate = useNavigate(); // Use navigate for redirection after signout
    const { userId } = useParams(); 

    useEffect(() => {
        // Fetch patient data from Supabase
        const fetchPatientData = async () => {
            try {
                const { data, error } = await supabase
                    .from('patient_data') // Adjust this to your Supabase table name
                    .select('*'); // Adjust according to the fields you need

                if (error) {
                    throw error;
                }

                if (data) {
                    setPatientData(data); // Set patient data in state
                }
            } catch (error) {
                console.error('Error fetching patient data:', error.message);
            }
        };

        fetchPatientData();
    }, []);

    useEffect(() => {
        // Fetch doctor data from Supabase
        async function fetchDoctorData() {
            try {
                const { data, error } = await supabase
                    .from('user')
                    .select('name')
                    .eq('user_id',username.value)
                    .single();

                if (error) {
                    throw error;
                }

                if (data) {
                    setDoctorName(data.name); // Set doctor name in state
                } else {
                    setDoctorName('Unknown'); // If doctor not found, set name as 'Unknown'
                }
            } catch (error) {
                console.error('Error fetching doctor data:', error.message);
            }
        }

        fetchDoctorData(); // Call the fetchDoctorData function when the component mounts
    }, []); // useEffect dependency array is empty since it only runs once

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
                        <span className="username">{doctorName}</span>
                        <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
                    </div>
                </div>
            </nav>
            <div className="main-container">
                <h2 className="welcome-heading">Welcome Doctor {doctorName}</h2> {/* Centered heading */}
                <h2>Doctor Dashboard</h2>
                <div className="container">
                    <table id="patientDataTable">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Registration No</th>
                                <th>Reason of Visit</th>
                                <th>Remarks</th>
                                <th>Prescription</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientData.map((patient, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.regNo}</td>
                                    <td>{patient.reason}</td>
                                    <td>{patient.remarks}</td>
                                    <td>{patient.prescription}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
