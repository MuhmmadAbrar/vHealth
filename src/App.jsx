import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Student/Login/Login';
import Landing from './components/Student/Landing/Landing';
import CreateToken from './components/Student/CreateToken/CreateToken';
import Navbar from './components/Navbar/Navbar';
import DoctorDashboard from './components/Doctor/DoctorDashboard/DoctorDashboard';
<<<<<<< Updated upstream
import MedicalHistory from './components/Student/MedicalHistory/MedicalHistory'
=======
import MedicalHistory from './components/Student/MedicalHistory/MedicalHistory';
import Report from './components/Report/report'; // Make sure the file path is correct
import Receptionist from './components/Receptionist/ReceptionistDashboard/ReceptionistDashboard'; // Import the Receptionist component
>>>>>>> Stashed changes

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Login />} />
<<<<<<< Updated upstream
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/create-token" element={<CreateToken />} />
                    <Route path="/doctor-dashboard" element={<DoctorDashboard/>} />
                    <Route path="/medical-history" element={<MedicalHistory/>}/>
=======
                    <Route path="/landing/:userId" element={<Landing />} />
                    <Route path="/create-token/:userId" element={<CreateToken />} />
                    <Route path="/doctor-dashboard/:userId" element={<DoctorDashboard />} />
                    <Route path="/medical-history/:userId" element={<MedicalHistory />} />
                    <Route path="/report/:userId" element={<Report />} />
                    <Route path="/receptionist/:userId" element={<Receptionist />} /> {/* Add this line for the Receptionist component */}
>>>>>>> Stashed changes
                </Routes>
            </div>
        </Router>
    );
}

export default App;