import { Typography, Box, Divider, Toolbar, Container, Fab, Slider, Slide} from "@mui/material";
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

const Championships = () => {

    const [years, setYears] = useState([1900, 2000]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleFetch = () => {
        setLoading(true);
        setError(false);


        // fetch best team for stat
        const url = process.env.REACT_APP_SERVER_URL + "championships?startSeason=" + years[0] + "&endSeason=" + years[1];
        console.log("Fetching Championships from " + url);
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

    const handleYearsChange = (event, newVal) => {
        if (newVal === years) return;
        setYears(newVal);
        // handleFetch();
      
    }
    const [value, setValue] = useState([1900, 2000]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
        <Box>
        <Typography variant="overline" component="div" gutterBottom>
            Championships!
        </Typography>

        <Stack direction="row" spacing={2} sx={{my:3}} >
       
            <Box sx={{width: '100%'}}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={years}
                onChange={handleYearsChange}
                valueLabelDisplay="auto"
                min={1900}
                max={2022}
                marks={[
                    {value: 1900, label: '1900'},
                    {value: 1920, label: '1920'},
                    {value: 1940, label: '1940'},
                    {value: 1960, label: '1960'},
                    {value: 1980, label: '1980'},
                    {value: 2000, label: '2000'},
                    {value: 2020, label: '2020'},
                ]}
            />
            </Box>
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

        <Container sx={{m:0, p:0, mt:3}}>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <StyledTableRow>

                            <StyledTableCell align="right">Rank</StyledTableCell>
                            <StyledTableCell align="right">City</StyledTableCell>
                            <StyledTableCell align="right">NickName</StyledTableCell>
                            <StyledTableCell align="right">Wins</StyledTableCell>
                            <StyledTableCell align="right">RunnersUp</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="right">{row.rank}</StyledTableCell>
                                <StyledTableCell align="right">{row.city}</StyledTableCell>
                                <StyledTableCell align="right">{row.nickname}</StyledTableCell>
                                <StyledTableCell align="right">{row.numWins}</StyledTableCell>
                                <StyledTableCell align="right">{row.numRunnersUp}</StyledTableCell>
                            </StyledTableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </Container>  
       {
            data.length > 0 &&  
            <CSVLink data={data} filename={"championship_info"+ years[0] + "_" + years[1]  + ".csv"}>
                <Fab color="secondary" aria-label="download" sx={{ position: 'fixed', bottom: 20, right: 20 }}>
                    <DownloadIcon />
                </Fab>
            </CSVLink>
        }
    </Box>
    );
}

export default Championships;