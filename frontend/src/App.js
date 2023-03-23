import React, {useState} from 'react';

import AppBar from  '@mui/material/AppBar';
import Tabs from  '@mui/material/Tabs';
import Tab from  '@mui/material/Tab';
import List from '@mui/material/List';
import Typography  from '@mui/material/Typography';
import { Drawer, ListItem, Toolbar, Box, CssBaseline, Divider } from '@mui/material';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Link} from 'react-router-dom';



import QueryPage from './components/queryPage';
import Home from './components/Home';

function App() {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
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
                  <Tab label="Home" component={Link} to="/" />
                </ListItem>
                <ListItem key="Query" disablePadding>
                  <Tab label="Query" component={Link} to="/query" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/query" element={<QueryPage />} />
          </Routes>
        </Box>
    </Router>
  );
}

export default App;