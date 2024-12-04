import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Menu, MenuItem, Popover } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Profile from '../home/Profile/index'; // Import the Profile component

function TopHeader({ onMenuClick, onLogoutClick }) {
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] = useState(null);

  // Handle opening and closing of profile menu
  const handleProfileMenuClick = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  // Handle opening and closing of settings menu
  const handleSettingsMenuClick = (event) => {
    setSettingsMenuAnchorEl(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setSettingsMenuAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0, backgroundColor: 'white' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Menu Button */}
          <IconButton
            edge="start"
            sx={{
              color: 'black',
            }}
            aria-label="menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>

          {/* Right Corner Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Profile Icon Menu */}
            <IconButton sx={{ color: 'black' }} onClick={handleProfileMenuClick}>
              <AccountCircleIcon />
            </IconButton>

            <Popover
              open={Boolean(profileMenuAnchorEl)}
              anchorEl={profileMenuAnchorEl}
              onClose={handleProfileMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <Profile /> {/* Display the Profile Component */}
            </Popover>

            {/* Settings Icon Menu */}
            <IconButton sx={{ color: 'black' }} onClick={handleSettingsMenuClick}>
              <SettingsIcon />
            </IconButton>
            <Menu
              anchorEl={settingsMenuAnchorEl}
              open={Boolean(settingsMenuAnchorEl)}
              onClose={handleSettingsMenuClose}
            >
              <MenuItem onClick={handleSettingsMenuClose}>Dashboard Settings</MenuItem>
            </Menu>

            {/* Logout Icon */}
            <IconButton sx={{ color: 'black' }} onClick={onLogoutClick}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default TopHeader;
