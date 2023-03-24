import React, {useState} from 'react';

import AppBar from  '@mui/material/AppBar';
import Tabs from  '@mui/material/Tabs';
import Tab from  '@mui/material/Tab';
import List from '@mui/material/List';
import Typography  from '@mui/material/Typography';
import { Drawer, ListItem, ListItemText, Toolbar, Box, CssBaseline, Divider, ListItemIcon, ListItemButton } from '@mui/material';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Link} from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import QueryPage from './components/queryPage';
import Home from './components/Home';
import TeamStat from './components/TeamStat';
import TeamComp from './components/TeamComp';

function App() {

  const [value, setValue] = useState(0);
  const server_url = ""

  return (
    <Router>
        <Box sx={{display: 'flex'}}>
          <CssBaseline/>
        
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography variant="h6" component="div" noWrap>
                NBA Stat Tracker
              </Typography>
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
                <ListItem key="Query" disablePadding>
                  <ListItemButton component={Link} to="/query">
                    <ListItemIcon>
                      <StorageRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Query" />
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
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;