import React, {useState} from "react";
import { Select } from "@mui/material";


const TeamSelection = ({onTeamChanged}) => {
    const [team, setTeam] = useState("");

    const handleTeamChange = (event) => {
        setTeam(event.target.value);
        onTeamChanged(event.target.value);
    }
    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={team}
            label="Team"
            onChange={(event) => handleTeamChange(event)}
        >
            <option value="Team 1">Team 1</option>
            <option value="Team 2">Team 2</option>
            <option value="Team 3">Team 3</option>
        </Select>    
    );
}

export default TeamSelection;