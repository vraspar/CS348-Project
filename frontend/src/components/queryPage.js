import React, {useState} from "react";
import axios from "axios";
import image from '../Assets/diagram.png';
import '../Styles/queryPage.css';
import {Autocomplete} from "@mui/lab";
import {Snackbar} from "@mui/material";

const QueryPage = () => {
    const [userInput, setUserInput] = useState('');
    const [submittedInput, setSubmittedInput] = useState('');
    const [previousInputs, setPreviousInputs] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleInputChange = (event) => {
        const text = event.target.value
        if (text.toLowerCase() === 'update' || text.toLowerCase() === 'delete' || text.toLowerCase() === 'alter' || text.toLowerCase() === 'drop') {
            setOpenSnackbar(true);
        } else {
            setUserInput(text);
            setOpenSnackbar(false);
        }
    };
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    const handleSelectChange = (event) => {
        setUserInput(event.target.value);
    };
    const url = process.env.REACT_APP_SERVER_URL +"query?query="
    const handleSubmit = async (event) => {
        event.preventDefault();
        setPreviousInputs([...previousInputs, submittedInput]);
        setSubmittedInput(userInput.replace(/\n/g, " "));

        setUserInput('');
        try {
            setError("Loading...");
            setHeaders([]);
            setRows([]);
            const res = await axios.get(url + submittedInput);
            setHeaders(res.data.headers);
            setRows(res.data.rows);
            setError("Success!");
        } catch (err) {
            console.log(err);
            setHeaders([]);
            setRows([]);

            setError(err.message);

        }
    };

    const anchorOrigin = { vertical: 'top', horizontal: 'center' }

    return (
        <div className="app-container">
            <header>
                <h1>CS 348 Group Project - Group 15</h1>
            </header>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="user-input">Please enter your SQL query below</label>
                    <label htmlFor="sample-title">Sample SQL query templates</label>
                    <select className={"sample-searches"} onChange={handleSelectChange}>
                        <option value="SELECT * FROM">SELECT * FROM</option>
                        <option value="SELECT * FROM WHERE">SELECT * FROM WHERE</option>
                        <option value="SELECT * INTO FROM">SELECT * INTO FROM</option>
                        <option value="SELECT DISTINCT FROM">SELECT DISTINCT FROM</option>
                        <option value="CREATE TABLE">CREATE TABLE</option>
                    </select>
                    <textarea
                        id={"user-input"}
                        rows={4}
                        cols={50}
                        value={userInput}
                        onChange={handleInputChange}
                        className={"textarea-input"}
                    />
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackbar}
                        message="Sorry, this command is not permitted!"
                        anchorOrigin={anchorOrigin}
                    />
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div className="output-container">
                {submittedInput && (
                    <div className="output-field" dangerouslySetInnerHTML={{ __html: submittedInput }}></div>
                )}
                <label htmlFor="previous-searches-header">Previous Queries</label>
                <select className={"previous-searches"} onChange={handleSelectChange}>
                    {previousInputs.map((input, index) => (
                        <option key={index} value={input}>
                            {input}
                        </option>
                    ))}
                </select>

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

export default QueryPage;