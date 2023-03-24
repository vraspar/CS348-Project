import { Typography, Box, Divider, Toolbar} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

import TeamSelection from "./base/TeamSelection";
// Get list of teams from backend and show them in dropdown menu

const TeamComp = () => {
    return (
        <Box>
            <Typography variant="overline" component="div" gutterBottom>
                Team Comparison
            </Typography>
            <Stack direction="row" spacing={2} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
            
                <TeamSelection />
               
                <Toolbar>
                <Typography variant="h6" gutterBottom>
                    V/S
                </Typography>
                </Toolbar>

                <TeamSelection />
            </Stack>
            
        </Box>
       
       
        
    );
}

export default TeamComp;