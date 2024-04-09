import React, { useState } from 'react';
import './DoctorDashboard.css'; // Import your CSS file here
import { supabase } from '../../../supabase'; // Assuming you have a separate file for Supabase initialization

const DoctorDashboard = () => {
    const [formData, setFormData] = useState({
        name: '',
        regNo: '',
        reason: '',
        remarks: '',
        prescription: ''
    });
    // Function to handle button click for viewing patient history
    const viewHistory = () => {
        // Add your logic for viewing patient history here
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // Get current date and time
            const currentDate = new Date().toLocaleDateString('en-CA'); // ISO 8601 format (YYYY-MM-DD)
            const currentTime = new Date().toLocaleTimeString('it-IT'); // 24-Hour format (HH:MM:SS)
    
            // Combine the formData with currentDate and currentTime
            const submissionData = {
                name: formData.name,
                regNo: formData.regNo,
                reason: formData.reason, // Make sure this matches the column name in your Supabase table
                remarks: formData.remarks,
                prescription: formData.prescription,
                date: currentDate, // Assuming your column for the date is named 'date'
                time: currentTime  // Assuming your column for the time is named 'time'
            };
    
            // Insert submissionData into Supabase table
            const { data, error } = await supabase.from('history').insert([submissionData]); // Make sure 'history' matches your table name
    
            if (error) {
                throw error;
            }
    
            console.log("New record added:", data);
            alert("Patient added sucessfully!")
            // Reset formData state if needed
            setFormData({
                name: '',
                regNo: '',
                reason: '',
                remarks: '',
                prescription: ''
            });
        } catch (error) {
            console.error("Error adding new record:", error.message);
        }
    };

    return (
        <div>
            <div className="home"></div>
            {/* <nav className="navbar">
                <div className="container">
                    <img src="VIT_Logo.jpg" alt="College Logo" />
                    <div className="profile">
                        <img id="profileImg" src="https://picsum.photos/200" alt="Profile Photo" />
                        <span className="username">John Doe</span>
                    </div>
                </div>
            </nav> */}

            <div className="main-container">
                {/* Button to view patient history */}
                <button onClick={viewHistory}>View History</button>

                <form id="visitForm" onSubmit={handleSubmit}>
                    {/* Name input */}
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>

                    {/* Registration Number input */}
                    <div>
                        <label htmlFor="regNo">Reg No:</label>
                        <input type="text" id="regNo" name="regNo" value={formData.regNo} onChange={(e) => setFormData({ ...formData, regNo: e.target.value })} required />
                    </div>

                    {/* Reason of Visit */}
                    <div>
                        <label htmlFor="reason">Reason of Visit:</label>
                        <textarea id="reason" name="reason" value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} required></textarea>
                    </div>

                    {/* Add remarks */}
                    <div>
                        <label htmlFor="remarks">Remarks:</label>
                        <textarea id="remarks" name="remarks" value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} required></textarea>
                    </div>

                    {/* Prescription */}
                    <div>
                        <label htmlFor="prescription">Prescription:</label>
                        <textarea id="prescription" name="prescription" value={formData.prescription} onChange={(e) => setFormData({ ...formData, prescription: e.target.value })} required></textarea>
                    </div>

                    {/* Submit button */}
                    <button type="submit">Close Token</button>
                </form>
            </div>
            <script src="history.js"></script>
        </div>
    );
};

export default DoctorDashboard;
