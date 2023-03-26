import React, {useEffect, useState} from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";


const StatSelection = ({onStatChanged}) => {
    const [stat, setStat] = useState([]);
    const [currentStat, setCurrentStat] = useState("")
    const [loading, setLoading] = useState(true);

    const handleStatChange = (event) => {
        setCurrentStat(event.target.value);
        onStatChanged(event.target.value);

    }

    useEffect(() => {

        // fetch list of possible stats from backend
        // setStat(list of stats)

        
        const fetchStat = async () => {
            const url = process.env.REACT_APP_SERVER_URL +"statNames"
            console.log("Fetching stats from " + url);
            axios.get(url)
            .then((res) => {
                console.log(res);
                setStat(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setStat([]);
            }
            );
            
           
        }
        setLoading(true);
        fetchStat();
       
    }, []);

    return (
        <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Statistics</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentStat}
            label="Statistics"
            onChange={(event) => handleStatChange(event)}
        >
            {!loading && stat.map((stat, index) => (
                <MenuItem value={stat}>{stat}</MenuItem>
            ))}
           
        </Select>    
        </FormControl>
    );
}

export default StatSelection;