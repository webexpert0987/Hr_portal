import React from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function TopHeader({ onMenuClick, onLogoutClick }) {
  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0, backgroundColor: 'white' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Menu Button (Fixed Position) */}
        <IconButton
          edge="start"
          sx={{
            color: 'black',
          }}
          aria-label="menu"
          onClick={onMenuClick} // Toggle the sidebar when clicked
        >
          <MenuIcon />
        </IconButton>

        {/* Right Corner Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ color: 'black' }}>
            <AccountCircleIcon />
          </IconButton>
          <IconButton sx={{ color: 'black' }}>
            <SettingsIcon />
          </IconButton>
          <IconButton sx={{ color: 'black' }} onClick={onLogoutClick}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopHeader;
