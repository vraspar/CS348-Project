import { Typography, Box, Divider, Toolbar, Container, Fab} from "@mui/material";
import { Stack } from "@mui/system";
import React, {useState} from "react";
import {CSVLink, CSVDownload} from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';

import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    Paper,
  } from "@mui/material";

import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";

import StatSelection from "./base/StatSelection";
import {StyledTableCell, StyledTableRow} from "../Styles/tables";

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

        <Stack direction="row" spacing={2} sx={{my:3}} >
       
            <StatSelection  onStatChanged={handleStatChange}/>
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
           


            
        </Stack>
       
        {error && <Typography variant="overline" component="div"sx={{color: "red"}} gutterBottom>
            Encounterd error while fetching data
            </Typography>}
        <Container sx={{m:0, p:0}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Team Name</StyledTableCell>
                            <StyledTableCell align="right">Player Name</StyledTableCell>
                            <StyledTableCell align="right">Stat</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <StyledTableRow
                                key={index}
                                
                            >
                                <StyledTableCell align="right">{row.teamName}</StyledTableCell>
                                <StyledTableCell align="right">{row.name}</StyledTableCell>
                                <StyledTableCell align="right">{row.stat}</StyledTableCell>
                                <StyledTableCell align="right">{row.date}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container> 
       
        <CSVLink data={data} filename={"bestTeam_" + stat + ".csv"}>
            <Fab color="secondary" aria-label="download" sx={{ position: 'fixed', bottom: 20, right: 20 }}>
                <DownloadIcon />
            </Fab>
        </CSVLink>
    </Box>
    );
}

export default BestTeam;