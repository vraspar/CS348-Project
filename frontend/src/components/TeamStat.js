import { Typography, Box, Divider, Toolbar} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

import TeamSelection from "./base/TeamSelection";

const TeamStat = () => {
    return (
        <Box>
        <Typography variant="overline" component="div" gutterBottom>
            Team Stat
        </Typography>
        <Stack direction="row" spacing={2} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
            <TeamSelection />
        </Stack>
        
    </Box>
    );
}

export default TeamStat;