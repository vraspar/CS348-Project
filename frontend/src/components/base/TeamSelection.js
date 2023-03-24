import React, {useState} from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


const TeamSelection = ({onTeamChanged}) => {
    const [team, setTeam] = useState("");

    const handleTeamChange = (event) => {
        setTeam(event.target.value);
        onTeamChanged(event.target.value);
    }
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Team</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={team}
            label="Team"
            onChange={(event) => handleTeamChange(event)}
        >
            <MenuItem value="Team 1">Team 1</MenuItem>
            <MenuItem value="Team 2">Team 2</MenuItem>
            <MenuItem value="Team 3">Team 3</MenuItem>
        </Select>    
        </FormControl>
    );
}

export default TeamSelection;