import React, {useState} from 'react';

import AppBar from  '@mui/material/AppBar';
import Tabs from  '@mui/material/Tabs';
import Tab from  '@mui/material/Tab';
import List from '@mui/material/List';
import Typography  from '@mui/material/Typography';
import { Drawer, ListItem, ListItemText, Toolbar, Box, CssBaseline, Divider, ListItemIcon, ListItemButton, IconButton } from '@mui/material';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Link} from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import QueryPage from './components/queryPage';
import Home from './components/Home';
import TeamStat from './components/TeamStat';
import TeamComp from './components/TeamComp';
import BestTeam from './components/BestTeam';
import TeamAway from './components/TeamAway';
import TeamCloseWins from './components/TeamCloseWins';
import { Stack } from '@mui/system';
import GroupWork from '@mui/icons-material/GroupWork';
import ChampionShips from './components/Championships';

function App() {

  const [value, setValue] = useState(0);
  const [theme, setTheme] = useState('light');

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });


  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{display: 'flex'}}>
          <CssBaseline/>
        
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography variant="h6" component="div" noWrap>
                NBA Stat Tracker
              </Typography>
             <Stack direction="row" spacing={2} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                <IconButton onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
              </Stack>

            </Toolbar>
           
          </AppBar>
          <Drawer 
            variant="permanent"
            sx={{
              width: 240,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                <ListItem key="Home" disablePadding>
                  <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                      <HomeRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="BestTeam" disablePadding>
                  <ListItemButton component={Link} to="/bestteam">
                    <ListItemIcon>
                      <GroupWork />
                    </ListItemIcon>
                    <ListItemText primary="Best Team" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="TeamStat" disablePadding>
                  <ListItemButton component={Link} to="/teamstat">
                    <ListItemIcon>
                      <ShowChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Teams Stat" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="TeamComp" disablePadding>
                  <ListItemButton component={Link} to="/teamcomp">
                    <ListItemIcon>
                      <CompareArrowsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Team Comparison" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="TeamAway" disablePadding>
                  <ListItemButton component={Link} to="/teamaway">
                    <ListItemIcon>
                      <MeetingRoomIcon />
                    </ListItemIcon>
                    <ListItemText primary="Team Away" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="TeamCloseWins" disablePadding>
                  <ListItemButton component={Link} to="/teamclosewins">
                    <ListItemIcon>
                      <EmojiEventsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Team Close Wins" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="Query" disablePadding>
                  <ListItemButton component={Link} to="/query">
                    <ListItemIcon>
                      <StorageRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Query" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="ChampionShips" disablePadding>
                  <ListItemButton component={Link} to="/championships">
                    <ListItemIcon>
                      <CelebrationRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="ChampionShips" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/query" element={<QueryPage />} />
            <Route path="/teamstat" element={<TeamStat />} />
            <Route path="/teamcomp" element={<TeamComp />} />
            <Route path="/bestteam" element={<BestTeam />} />
            <Route path="/teamclosewins" element={<TeamCloseWins />} />
            <Route path="/teamaway" element={<TeamAway />} />
            <Route path="/championships" element={<ChampionShips />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
    </Router>
  );
}

export default App;