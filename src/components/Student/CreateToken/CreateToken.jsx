import React, { useState, useEffect } from 'react';
import './CreateToken.css';
import VIT_Logo from './VIT_Logo.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../../supabase'; // Import your Supabase client instance

function CreateToken() {
  const { userId } = useParams(); // Get userId from URL parameter
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [maxToken, setMaxToken] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudentData(); // Call the fetchStudentData function when the component mounts
  }, [userId]);

  useEffect(() => {
    const fetchMaxToken = async () => {
      try {
        const { data: maxTokenData, error } = await supabase
          .from('history')
          .select('token', { head: 'max' });

        if (error) {
          throw error;
        }

        // If maxTokenData is null or empty, set maxToken to 0
        setMaxToken(maxTokenData?.[0]?.max || 0);
      } catch (error) {
        console.error('Error fetching max token:', error.message);
        setError(error.message);
      }
    };

    fetchMaxToken();
  }, []);

  useEffect(() => {
    const fetchPendingRequestsCount = async () => {
      try {
        const { data: pendingRequestsData, error } = await supabase
          .from('history')
          .select('*', { count: 'exact' })
          .eq('regNo', userId)
          .eq('status', 'Open');

        if (error) {
          throw error;
        }

        // Set the count of pending requests for the user
        setPendingRequestsCount(pendingRequestsData?.length || 0);
      } catch (error) {
        console.error('Error fetching pending requests count:', error.message);
        setError(error.message);
      }
    };

    fetchPendingRequestsCount();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get selected category and description
    const category = event.target.category.value;
    const description = event.target.description.value;

    if (!studentName) {
      console.error('Student name not available');
      return;
    }

    try {
      // Get current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10); // Get date in YYYY-MM-DD format
      const formattedTime = currentDate.toLocaleTimeString(); // Get time in HH:MM:SS format

      // Insert data into the Supabase table with incremented token number and current date/time
      const { data, error } = await supabase.from('history').insert([
        { token: maxToken + 1, name: studentName, regNo: userId, status: 'Open', reason: category, Description: description, date: formattedDate, time: formattedTime },
      ]);

      if (error) {
        console.error('Error inserting data:', error);
        setError(error.message);
      } else {
        // Display confirmation message
        setConfirmationMessage(`Thank you for submitting your grievance.<br>Category: ${category}<br>Description: ${description}`);
      }
    } catch (error) {
      console.error('Error inserting data:', error);
      setError(error.message);
    }
  };

  const handleCancelAllRequests = async () => {
    try {
      // Update the status of pending requests to 'Cancelled' for the user
      await supabase.from('history').update({ status: 'Cancelled' }).eq('regNo', userId).eq('status', 'Open');

      // Display confirmation message
      setConfirmationMessage('All pending requests have been cancelled.');

      // Reset the page to its original state
      setMaxToken(0);
      setConfirmationMessage('');
      setPendingRequestsCount(0);
    } catch (error) {
      console.error('Error cancelling requests:', error.message);
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut(); // Sign out the user using Supabase auth
      navigate('/'); // Redirect to the login page after signout
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
      <div className="container-main">
        <div className="live-status">
          <h2>You got</h2>
          <div className="queue-info">
            <span className="queue-number">5</span>
          </div>
          <h2>People ahead of you</h2>
        </div>
        <div className="form">
          {pendingRequestsCount === 0 && (
            <form id="grievanceForm" onSubmit={handleSubmit}>
              <label htmlFor="category">Select Category:</label>
              <select id="category" name="category">
                <option value="Fever">Fever</option>
                <option value="Cold/Cough">Cold/Cough</option>
                <option value="Headache">Headache</option>
                <option value="Body Pain">Body Pain</option>
                <option value="Food Poisoning">Food Poisoning</option>
                <option value="Injury/Accident">Injury/Accident</option>
                <option value="Other">Other</option>
              </select>

              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" rows="4" placeholder="Enter your grievance description here..."></textarea>

              <button type="submit" id="submitBtn">Submit</button>
            </form>
          )}
        </div>
        {pendingRequestsCount > 0 && (
          <div className="cancel-requests">
            <p>You have {pendingRequestsCount} pending requests.</p>
            <button onClick={handleCancelAllRequests}>Cancel All Requests</button>
          </div>
        )}
        <div id="confirmationMessage" className="confirmation-message" dangerouslySetInnerHTML={{ __html: confirmationMessage }}></div>
      </div>
    </div>
  );
}

export default CreateToken;
