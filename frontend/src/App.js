import React, { useState } from 'react';
import './App.css';
import image from './diagram.PNG';

function App() {
  const [userInput, setUserInput] = useState('');
  const [submittedInput, setSubmittedInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedInput(userInput.replace(/\n/g, '<br>'));
    setUserInput('');
  };

  return (
    <div className="app-container">
      <header>
        <h1>CS 348 Group Project - Group 15</h1>
      </header>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="user-input">Please enter your SQL query below</label>
          <textarea id="user-input" rows="4" cols="50" value={userInput} onChange={handleInputChange} className="textarea-input" />
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="output-container">
        {submittedInput && (
          <div className="output-field" dangerouslySetInnerHTML={{ __html: submittedInput }}></div>
        )}
        Our ER Diagram for our Database
        <img src={image} alt="My Image" className="my-image" />
      </div>
    </div>
  );
}

export default App;