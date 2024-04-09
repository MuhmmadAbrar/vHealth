import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Student/Login/Login';
import Landing from './components/Student/Landing/Landing';
import CreateToken from './components/Student/CreateToken/CreateToken';
import Navbar from './components/Navbar/Navbar';
import MedicalHistory from './components/Student/MedicalHistory/MedicalHistory';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/create-token" element={<CreateToken />} />
                    <Route path="/medical-history" element={<MedicalHistory />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
