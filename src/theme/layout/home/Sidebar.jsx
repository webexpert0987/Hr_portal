import React, { forwardRef, useState, useEffect } from 'react';
import { Box, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon
import DashboardIcon from '@mui/icons-material/Dashboard'; // Dashboard icon
import PeopleIcon from '@mui/icons-material/People'; // Team icon
import WorkIcon from '@mui/icons-material/Work'; // Project icon
import EventNoteIcon from '@mui/icons-material/EventNote'; // Holidays and Leave icon

const Sidebar = forwardRef((props, ref) => {
  const { onClose, onItemClick } = props;

  // State to track the selected item
  const [selectedItem, setSelectedItem] = useState('');

  // Effect to load the selected item from localStorage when the component mounts
  useEffect(() => {
    const savedSelectedItem = localStorage.getItem('selectedItem') || 'Dashboard';
    setSelectedItem(savedSelectedItem);
  }, []);

  // Function to handle item click and set the selected item
  const handleItemClick = (item) => {
    setSelectedItem(item);
    localStorage.setItem('selectedItem', item); // Save selected item to localStorage
    onItemClick(item); // Call the parent onItemClick handler
  };

  return (
    <Box
      ref={ref}
      sx={{
        width: '250px',
        height: '100vh',
        backgroundColor: '#3C4B64', // Dark blue background color
        padding: 2,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1201,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        transition: 'transform 0.3s ease',
      }}
    >
      {/* Close Icon */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'white',
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* HR Portal Name */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '60px' }}>
        <span style={{ color: 'white' }}>HR</span> <span style={{ color: 'black' }}>Portal</span>
      </Typography>

      {/* Sidebar Menu Items */}
      <List sx={{ width: '100%', marginTop: '20px' }}>
        <ListItem
          button
          onClick={() => handleItemClick('Dashboard')}
          sx={{
            backgroundColor: selectedItem === 'Dashboard' ? '#2A3A52' : 'transparent', // Dark blue for selected
            '&:hover': {
              backgroundColor: '#2A3A52', // Dark blue on hover
            },
          }}
        >
          <DashboardIcon sx={{ color: 'white', marginRight: 2 }} />
          <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem
          button
          onClick={() => handleItemClick('Team')}
          sx={{
            backgroundColor: selectedItem === 'Team' ? '#2A3A52' : 'transparent',
            '&:hover': {
              backgroundColor: '#2A3A52',
            },
          }}
        >
          <PeopleIcon sx={{ color: 'white', marginRight: 2 }} />
          <ListItemText primary="Team" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem
          button
          onClick={() => handleItemClick('Project')}
          sx={{
            backgroundColor: selectedItem === 'Project' ? '#2A3A52' : 'transparent',
            '&:hover': {
              backgroundColor: '#2A3A52',
            },
          }}
        >
          <WorkIcon sx={{ color: 'white', marginRight: 2 }} />
          <ListItemText primary="Project" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem
          button
          onClick={() => handleItemClick('Holidays and Leave')}
          sx={{
            backgroundColor: selectedItem === 'Holidays and Leave' ? '#2A3A52' : 'transparent',
            '&:hover': {
              backgroundColor: '#2A3A52',
            },
          }}
        >
          <EventNoteIcon sx={{ color: 'white', marginRight: 2 }} />
          <ListItemText primary="Holidays and Leave" sx={{ color: 'white' }} />
        </ListItem>
      </List>
    </Box>
  );
});

export default Sidebar;
