import React, { useEffect, useState } from 'react';
import './DoctorDashboard.css'; // Make sure the path is correct
import { supabase } from '../../../supabase'; // Import your Supabase client instance
import { useNavigate } from 'react-router-dom';
import VIT_Logo from './VIT_Logo.jpg';
import { useParams } from 'react-router-dom';

const DoctorDashboard = () => {
    const [patientData, setPatientData] = useState([]);
    const [dataLength, setDataLength] = useState([0]);
    const [doctorName, setDoctorName] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate(); // Use navigate for redirection after signout
    const { userId } = useParams();

    useEffect(() => {
        // Fetch patient data from Supabase
        const fetchPatientData = async () => {
            try {
                const { data, error } = await supabase
                    .from('history') // Adjust this to your Supabase table name
                    .select('*'); // Adjust according to the fields you need

                const { data1, error1 } = await supabase
                    .from('q_info') // Adjust this to your Supabase table name
                    .select('*'); // Adjust according to the fields you need

                if (error) {
                    throw error;
                }

                if (data) {
                    setPatientData(data); // Set patient data in state
                }
                if(data1){
                    setDataLength(data1.length)
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
                    .eq('user_id', userId)
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

    const handleTokenClose =async () => {
        setCurrentIndex(prevIndex => prevIndex + 1);
        // Call the asynchronous function
        sendDataToSupabase();
        
    };

    const handleReportPatient = async() => {
        // Logic to report patient goes here
    };

    //extract the data
    const remarksArray = patientData.map(patient => patient.remarks);
    const prescriptionArray = patientData.map(patient => patient.prescription);

    //adding data into the database
    const sendDataToSupabase = async () => {
        try {
            const { data, error } = await supabase
            .from('history')
            .update({ status: "Closed", remarks: remarksArray, prescription: prescriptionArray })
            .eq('regNo', userId)
            .eq('datetime', patientData.datetime); // Adjust this according to your data structure
            if (error) {
                throw error;
            }
    
            console.log('Data added to Supabase:', data);
        } catch (error) {
            console.error('Error adding data to Supabase:', error.message);
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
                <h2 className="dashboard-heading">Doctor Dashboard</h2>

                <div className="live-status">
                    <h2>Queue Count</h2>
                    <div className="queue-info">
                        <span className="queue-number">{3}</span>
                    </div>
                </div>

                <div className="container">
                    {patientData.slice(currentIndex, currentIndex + 1).map((patient, index) => (
                        <form key={index} className="patient-form">
                            <h3 className="form-heading">Patient Details</h3>
                            <div className="form-row">
                                <label>Ticket No</label>
                                <span>{index + 1}</span>
                            </div>
                            <div className="form-row">
                                <label>Name</label>
                                <span>{patient.name}</span>
                            </div>
                            <div className="form-row">
                                <label>Registration No</label>
                                <span>{patient.regNo}</span>
                            </div>
                            <div className="form-row">
                                <label>Reason of Visit</label>
                                <span>{patient.reason}</span>
                            </div>
                            <div className="form-row">
                                <label htmlFor={`remarks_${index}`}>Remarks</label>
                                <input id={`remarks_${index}`} type="text" placeholder="Remarks" style={{ height: '100px' }}/>
                            </div>
                            <div className="form-row">
                                <label htmlFor={`prescription_${index}`}>Prescription</label>
                                <input id={`prescription_${index}`} type="text" placeholder="Prescription" style={{ height: '100px' }}/>
                            </div>
                            <div className="form-row">
                                <button type="button" onClick={handleTokenClose}>Close Token</button>
                            </div>
                            <div className="form-row">
                                <button type="button" className="report-btn" onClick={handleReportPatient}>Report Patient</button>
                            </div>
                        </form>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
