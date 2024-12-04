import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import TopHeader from '../home/TopHeader';
import Sidebar from '../home/Sidebar';
import Dashboard from '../home/Dashboard/index';

function Home() {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false); // Dialog state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const [selectedItem, setSelectedItem] = useState('Dashboard'); // Track selected menu item
  const sidebarRef = useRef(null); // Ref to sidebar for detecting outside click
  const navigate = useNavigate(); // For navigation after logout

  // Handle logout confirmation
  const handleLogoutClick = () => {
    setOpenLogoutDialog(true); // Open the confirmation dialog
  };

  // Confirm logout action
  const handleConfirmLogout = () => {
    Cookies.remove('isLoggedIn'); // Remove the cookie on logout
    setOpenLogoutDialog(false); // Close the dialog
    navigate('/'); // Redirect to login page
  };

  // Cancel logout action
  const handleCancelLogout = () => {
    setOpenLogoutDialog(false); // Close the dialog
  };

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev); // Toggle the sidebar state
  };

  // Close the sidebar when clicked outside
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false); // Close the sidebar if clicked outside
    }
  };

  // Add event listener to handle outside click
  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside); // Attach event listener when sidebar is open
    } else {
      document.removeEventListener('mousedown', handleClickOutside); // Remove event listener when sidebar is closed
    }

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Handle when an item in the sidebar is clicked
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsSidebarOpen(false); // Close the sidebar after selecting an item
  };

  // Function to render content based on selected item
  const renderContent = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return  <div> <Dashboard /> </div>
      case 'Team':
        return <Typography variant="h5">Manage Your Team</Typography>;
      case 'Project':
        return <Typography variant="h5">Project Management</Typography>;
      case 'Holidays and Leave':
        return <Typography variant="h5">Holidays and Leave Management</Typography>;
      default:
        return <Typography variant="h5">Select a menu item</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top Header with sidebar toggle */}
      <TopHeader onMenuClick={toggleSidebar} onLogoutClick={handleLogoutClick} isMenuOpen={isSidebarOpen} />

      {/* Sidebar with close functionality */}
      {isSidebarOpen && <Sidebar ref={sidebarRef} onClose={() => setIsSidebarOpen(false)} onItemClick={handleItemClick} />}

      {/* Main Content Area */}
      <Box
        sx={{
          marginTop: 8, // To avoid overlap with the fixed header
          padding: 2,
          flexGrow: 1,
          backgroundColor: '#f5f5f5',
          transition: 'margin-left 0.3s ease', // Smooth transition
          marginLeft: isSidebarOpen ? '270px' : '0', // Ensure enough margin for sidebar width
          paddingLeft: isSidebarOpen ? '20px' : '0', // Additional space to the left when the sidebar is open
        }}
      >
        {renderContent()}
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={handleCancelLogout}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Home;
