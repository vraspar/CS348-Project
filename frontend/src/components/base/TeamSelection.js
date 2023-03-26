import React, {useState, useEffect} from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";


const TeamSelection = ({onTeamChanged}) => {
    const [curTeam, setCurTeam] = useState("");
    const [team, setTeam] = useState("");
    const [loading, setLoading] = useState(true);

    const handleTeamChange = (event) => {
        setCurTeam(event.target.value);
        onTeamChanged(event.target.value);
    }

    useEffect(() => {

        // fetch list of possible teams from backend
        // setStat(list of stats)

        const fetchTeam = async () => {
            const url = process.env.REACT_APP_SERVER_URL +"teams"
            console.log("Fetching teams from " + url);
            axios.get(url)
            .then((res) => {
                console.log(res);
                setTeam(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setTeam([]);
            }
            );
        }
        setLoading(true);
        fetchTeam();
    }, []);
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Team</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={curTeam}
            label="Team"
            onChange={(event) => handleTeamChange(event)}
        >
            {!loading && team.map((team, index) => (
                <MenuItem value={team.id}>{team.nickname}</MenuItem>
            ))}
        </Select>    
        </FormControl>
    );
}

export default TeamSelection;