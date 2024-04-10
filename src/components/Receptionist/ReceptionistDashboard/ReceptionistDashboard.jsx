import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabase'; 
import { useNavigate } from 'react-router-dom';
import VIT_Logo from './VIT_Logo.jpg';
import { useParams } from 'react-router-dom';

// Initialize Supabase client

const HealthCentreDashboard = () => {
    const [patientData, setPatientData] = useState([]);
    const [dataLength, setDataLength] = useState(0);    //stores the length
    const navigate = useNavigate(); // Use navigate for redirection after signout
    const { userId } = useParams(); 

    useEffect(() => {
        // Fetch patient data from Supabase
        const fetchPatientData = async () => {
            
            try {
                const { data, error } = await supabase
                    .from('q_info') // Adjust this to your Supabase table name
                    .select('*'); // Adjust according to the fields you need

                if (error) {
                    throw error;
                }

                if (data) {
                    setPatientData(data); // Set patient data in state
                    setDataLength(data.length);     //set the length
                }
            } catch (error) {
                console.error('Error fetching patient data:', error.message);
            }
        };

        fetchPatientData();
    }, []);

    return (
        
        <div>
            <nav className="navbar">
                <div className="container">
                    <img src={VIT_Logo} alt="College Logo" />
                    <div className="profile">
                        <div className="centered-text">
                            <span className="username">VIT Health Centre</span>
                            </div>
                    </div>
                </div>
            </nav>
            <div className="main-container">

                <h1 className="welcome-heading"> No of People in Queue:{dataLength}</h1> {/* Centered heading */}
                <div className="container">

                    <table id="patientDataTable">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Registration No</th>
                                <th>Token Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientData.map((patient, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{patient.pname}</td>
                                    <td>{patient.rno}</td>
                                    <td>{patient.rno}</td>
                                   
                                    <td><button onClick={null} className="report-button">Report</button></td> {} 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HealthCentreDashboard;


/*
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyComponent from './MyComponent';
import AnotherPage from './AnotherPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MyComponent} />
        <Route path="/another-page" component={AnotherPage} />
      </Switch>
    </Router>
  );
}

export default App;

*/
