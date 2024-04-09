import React, { useState } from 'react';
import './CreateToken.css';
import { supabase } from '../../../supabase';
import VIT_Logo from './VIT_Logo.jpg'



function CreateToken() {
  const [confirmationMessage, setConfirmationMessage] = useState('');
  
  const handleSubmit = async (event) => {       //word async added to use await keyword
    event.preventDefault();

    // Get selected category and description
    const category = event.target.category.value;
    const description = event.target.description.value;

    //-----nidhi----//
    try {
      const { data, error } = await supabase.from('history').insert([
        {token:12,regNo:'21BAI677',status:'done',remarks:'take medicine', reason: category, Description: description,prescription:'Dolo650',name:'nidhi' }
      ]);
    
      if (error) {
        console.error('Error inserting data:', error);
      } else {
        // Display confirmation message
        setConfirmationMessage(`Thank you for submitting your grievance.<br>Category: ${category}<br>Description: ${description}`);
        
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }


    // Display confirmation message once data has been sent to database
    setConfirmationMessage(`Thank you for submitting your grievance.<br>Category: ${category}<br>Description: ${description}`);
  };

  return (
    <div>
    
      <div className="container-main">
        <div className="live-status">
          <h2>You got</h2>
          <div className="queue-info">
            <span className="queue-number">5</span>
          </div>
          <h2>People ahead of you</h2>
        </div>
        <div className="form">
          <form id="grievanceForm" onSubmit={handleSubmit}>
            <label htmlFor="category">Select Category:</label>
            <select id="category" name="category">
              <option value="Fever">Fever</option>
              <option value="Cold/Cough">Cold/Cough</option>
              <option value="Headache">Headache</option>
              <option value="Body Pain">Body Pain</option>
              <option value="Food Poisoning">Food Poisoning</option>
              <option value="Injury/Accident">Injury/Accident</option>
            </select>

            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" rows="4" placeholder="Enter your grievance description here..."></textarea>

            <button type="submit" id="submitBtn">Submit</button>
          </form>
        </div>
        <div id="confirmationMessage" className="confirmation-message" dangerouslySetInnerHTML={{ __html: confirmationMessage }}></div>
      </div>
    </div>
  );
}

export default CreateToken;
