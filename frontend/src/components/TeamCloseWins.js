import { Typography, Box, Divider, Toolbar, Container} from "@mui/material";
import { Stack } from "@mui/system";
import React, {useEffect, useState} from "react";
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



const TeamCloseWins = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);


    const handleFetch = () => {
        setLoading(true);
        setError(false);
        setData([]);
    

        // fetch best team for stat
        const url = process.env.REACT_APP_SERVER_URL + 'teamCloseWins' ;
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
            Team Away Performance
        </Typography>

        <Box >
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

        {error && <Typography variant="overline" component="div"sx={{color: "red"}} gutterBottom>
            Encounterd error while fetching data
            </Typography>}

        <Container sx={{m:0, p:0, mt:3}}>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <StyledTableRow>

                            <StyledTableCell align="right">Team Abbreviation</StyledTableCell>
                            <StyledTableCell align="right">Home Close Wins</StyledTableCell>
                            <StyledTableCell align="right">Away Close Wins</StyledTableCell>
                        
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="right">{row.team_abbre}</StyledTableCell>
                                <StyledTableCell align="right">{row.home_close_wins}</StyledTableCell>
                                <StyledTableCell align="right">{row.away_close_wins}</StyledTableCell>
                            </StyledTableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </Container>  
       {data.length > 0 &&
        <CSVLink data={data} filename={"closeWins.csv"}>
            <Fab color="secondary" aria-label="download" sx={{ position: 'fixed', bottom: 20, right: 20 }}>
                <DownloadIcon />
            </Fab>
        </CSVLink>  
    }
    </Box>
    );
}

export default TeamCloseWins;