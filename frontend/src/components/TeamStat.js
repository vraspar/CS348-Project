import { Typography, Box, Divider, Toolbar, Container} from "@mui/material";
import { Stack } from "@mui/system";
import React, {useState} from "react";
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    Paper,
    Fab
  } from "@mui/material";

import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import {CSVLink, CSVDownload} from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';


import TeamSelection from "./base/TeamSelection";
import {StyledTableCell, StyledTableRow} from "../Styles/tables";



const TeamStat = () => {

    const [team, setTeam] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);


    const handleTeamChange = (newVal) => {
        if (newVal === "") return;
        setTeam(newVal);
    }

    const handleFetch = () => {
        if (team === "") return;
        setLoading(true);
        setError(false);
    

        // fetch best team for stat
        const url = process.env.REACT_APP_SERVER_URL + "teams/" + team;
        console.log("Fetching team stat from " + url);
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
    return (
        <Box>
        <Typography variant="overline" component="div" gutterBottom>
            Team Stat
        </Typography>
        <Stack direction="row" spacing={2} sx={{ my:3 }}>
            <TeamSelection onTeamChanged={handleTeamChange} />
            <Box>
            <LoadingButton
                size="large"
                onClick={handleFetch}
                loading={loading}
                loadingPosition="end"
                endIcon={<SendIcon />}
                variant="contained"
            >
                <span>Fetch</span>
            </LoadingButton>
            </Box>
        </Stack>

        {error && <Typography variant="overline" component="div"sx={{color: "red"}} gutterBottom>
            Encounterd error while fetching data
            </Typography>}
            <Container sx={{m:0, p:0}}>
                <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <StyledTableRow>

                            {data.headers && data.headers.map((header, index) => (
                                index === 0 ? <StyledTableCell>{header}</StyledTableCell> :
                                <StyledTableCell align="right">{header}</StyledTableCell>
                            ))}
                        
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {data.rows && data.rows.map((row, index) => (
                            <StyledTableRow
                                key={index}
                                
                            >
                                {row.map((cell, index) => (
                                    <StyledTableCell align="right">{cell}</StyledTableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>  
       {data.headers && data.headers.length > 0 &&
        <CSVLink data={""}filename={team+"_stat.csv"}>
            <Fab color="secondary" aria-label="download" sx={{ position: 'fixed', bottom: 20, right: 20 }}>
                <DownloadIcon />
            </Fab>
        </CSVLink>  
    }
    </Box>
    );
}

export default TeamStat;