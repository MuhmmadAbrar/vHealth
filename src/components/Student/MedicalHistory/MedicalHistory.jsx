import React, { useEffect, useState } from 'react';
import './history.css'; // Make sure the path is correct
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://ttwewexsotqwxisgnntg.supabase.co";
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0d2V3ZXhzb3Rxd3hpc2dubnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzAyNTAsImV4cCI6MjAyODI0NjI1MH0.08M6Zn1pEAYSb7KrJnxrYWsaiVlurYpdBpkqV2HfFoE'
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MedicalHistory = () => {
  const [medicalHistory, setMedicalHistory] = useState([]);

  // Fetch medical history data from Supabase
  useEffect(() => {
    const fetchMedicalHistory = async () => {
      let { data, error } = await supabase
        .from('history') // Adjust this to your Supabase table name
        .select('*'); // Adjust according to the fields you need
        console.log(data);

      if (error) {
        console.error("Error fetching medical history", error);
      } else {
        setMedicalHistory(data);
      }
    };

    fetchMedicalHistory();
  }, []);

  return (
    <div>
      <div className="home"></div>
      <nav className="navbar">
        <div className="container">
          <img src="VIT_Logo.jpg" alt="College Logo" />
          <div className="profile">
            <img id="profileImg" src="https://picsum.photos/200" alt="Profile Photo" />
            <span className="username">John Doe</span>
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