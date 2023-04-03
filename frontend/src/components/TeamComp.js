import { Typography, Box, Divider, Toolbar} from "@mui/material";
import { Stack } from "@mui/system";
import React, {useEffect, useState} from "react";

import TeamSelection from "./base/TeamSelection";
import {StyledTableCell, StyledTableRow} from "../Styles/tables";
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import DownloadIcon from '@mui/icons-material/Download';
import axios from "axios";
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    Paper,
    Fab,
    Container
  } from "@mui/material";

// Get list of teams from backend and show them in dropdown menu

const TeamComp = () => {

    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [team1Info, setTeam1Info] = useState("");
    const [team2Info, setTeam2Info] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data1, setData1] = useState('-');
    const [data2, setData2] = useState('-');

    const handleTeam1Change = (newVal, team1Name) => {
        if (newVal === "") return;
        setTeam1(newVal);
        setTeam1Info(team1Name);
    }

    const handleTeam2Change = (newVal, team2Name) => {
        if (newVal === "") return;
        setTeam2(newVal);
        setTeam2Info(team2Name);
    }

    const handleFetch = () => {
        if (team1 === "" || team2 === "") return;
        setLoading(true);
        setError(false);

        // fetch best team for stat
        const url1 = process.env.REACT_APP_SERVER_URL + 'teamsHistory?home_team_ID='+ 
        team1 +'&away_team_ID='+ team2;

        const url2 = process.env.REACT_APP_SERVER_URL + 'teamsHistory?home_team_ID='+
        team2 +'&away_team_ID='+ team1;
        
        console.log("Fetching team stat from " + url1);
        axios.get(url1)
        .then((res) => {
            console.log("Finished Fetching url1")
            // append intger to data array
            setData1(res.data);
            setLoading(false);
            setError(false); 
        }
        )
        .catch((err) => {
            console.log(err);
            setData1([]);
            setLoading(false);
            setError(true);
        }
        )

        console.log("Fetching team stat from " + url2);
        axios.get(url2)
        .then((res) => {
            console.log("Finished Fetching url2")
            // append intger to data array
            setData2(res.data);
            setLoading(false);
            setError(false);
        }
        )
        .catch((err) => {
            console.log(err);
            setData2([]);
            setLoading(false);
            setError(true);
        }
        )

    }

    return (
        <Box>
            <Typography variant="overline" component="div" gutterBottom>
                Team Comparison
            </Typography>
            <Stack direction="row" spacing={2} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
            
                <TeamSelection onTeamChanged={handleTeam1Change} />
               
                <Toolbar>
                <Typography variant="body1" gutterBottom>
                    V/S
                </Typography>
                </Toolbar>

                <TeamSelection onTeamChanged={handleTeam2Change} />
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
                </Typography>
            }
             <Container sx={{m:0, p:0}}>
                <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Team</StyledTableCell>
                            <StyledTableCell align="right">Home Win</StyledTableCell>
                            <StyledTableCell align="right">Home Loss</StyledTableCell>

                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                       <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                {team1Info}
                            </StyledTableCell>
                            <StyledTableCell align="right">{data1}</StyledTableCell>
                            <StyledTableCell align="right">{data2}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                {team2Info}
                            </StyledTableCell>
                            <StyledTableCell align="right">{data2}</StyledTableCell>
                            <StyledTableCell align="right">{data1}</StyledTableCell>
                        </StyledTableRow>

                       
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>  
        </Box>

      
       
        
    );
}

export default TeamComp;