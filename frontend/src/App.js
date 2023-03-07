import React, { useState } from 'react';
import './App.css';
import image from './diagram.PNG';
import axios from 'axios';

function App() {
  const [userInput, setUserInput] = useState('');
  const [submittedInput, setSubmittedInput] = useState('');
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmittedInput(userInput.replace(/\n/g, '<br>'));
    setUserInput('');
    try {
      const res = await axios.get(`http://localhost:9093/api/query?query=${submittedInput}`);
        setHeaders(res.data.headers);
        setRows(res.data.rows);  
    } catch (err) {
      console.log(err);
      setHeaders([]);
      setRows([]);
      
      setError(err.message);

    }
    
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

        {error && (<div className="error-field">{error}</div>)}
        <br />
      
        {headers.length > 0 && (
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th>{header}</th>
              ))}
            </tr>
          </thead>
          {rows.length > 0 &&
            (<tbody>
              {rows.map((row) => (
                <tr>
                  {row.map((cell) => (
                    <td >{cell}</td>
                  ))}
                </tr>
              ))}

            </tbody>)
          }
        </table>)}
        Our ER Diagram for our Database
        <img src={image} alt="My Image" className="my-image" />
      </div>
    </div>
  );
}

export default App;