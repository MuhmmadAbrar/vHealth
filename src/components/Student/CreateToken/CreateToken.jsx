import React, { useState } from 'react';
import './CreateToken.css';
import VIT_Logo from './VIT_Logo.jpg'



function CreateToken() {
  const [confirmationMessage, setConfirmationMessage] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Get selected category and description
    const category = event.target.category.value;
    const description = event.target.description.value;

    // Display confirmation message
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
              <option value="Other">Other</option>
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
