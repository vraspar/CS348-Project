import { Typography, Box, Divider, Toolbar, Container} from "@mui/material";
import { Stack } from "@mui/system";
import React, {useState} from "react";

import StatSelection from "./base/StatSelection";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
  } from "@mui/material";

import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";

const BestTeam = () => {

    const [stat, setStat] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleFetch = () => {
        if (stat === "") return;
               
        setLoading(true);
        setError(false);


        // fetch best team for stat
        const url = process.env.REACT_APP_SERVER_URL + "bestTeamStatInAllMatches?stat=" + stat;
        console.log("Fetching best team for stat " + stat + " from " + url);
        axios.get(url)
        .then((res) => {
            console.log("Finished Fetching")
            setData(res.data);
            setLoading(false);
            setError(false);
        }
        )
        .catch((err) => {
            console.log(err);
            setData([]);
            setLoading(false);
            setError(true);
        }
        );
    }

    const handleStatChange = (newVal) => {
        if (newVal === stat) return;
        setStat(newVal);
      
    }
    return (
        <Box>
        <Typography variant="overline" component="div" gutterBottom>
            Best Team Finder
        </Typography>

        <Stack direction="row" spacing={2} >
       
            <StatSelection  onStatChanged={handleStatChange}/>
            <Box >
            <LoadingButton
                size="large"
                onClick={handleFetch}
                loading={loading}
                loadingPosition="end"
                endIcon={<SendIcon />}
                variant="contained"
                sx={{my: 3}}
               
            >
                <span>Fetch</span>
            </LoadingButton>
            </Box>
           


            
        </Stack>
       
        {error && <Typography variant="overline" component="div"sx={{color: "red"}} gutterBottom>
            Encounterd error while fetching data
            </Typography>}

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} >
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Team Name</TableCell>
                        <TableCell align="right">Player Name</TableCell>
                        <TableCell align="right">Stat</TableCell>
                        <TableCell align="right">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.team}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{row.teamName}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.stat}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>


        
    </Box>
    );
}

export default BestTeam;