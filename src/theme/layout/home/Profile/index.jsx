import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField, Button, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main Street, City, Country',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Save logic here, for example, sending data to an API
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '20px auto', padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          User Profile
        </Typography>

        {/* User Details */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Name:</Typography>
            {isEditing ? (
              <TextField
                fullWidth
                variant="outlined"
                name="name"
                value={userData.name}
                onChange={handleChange}
                size="small"
              />
            ) : (
              <Typography variant="body1">{userData.name}</Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Email:</Typography>
            {isEditing ? (
              <TextField
                fullWidth
                variant="outlined"
                name="email"
                value={userData.email}
                onChange={handleChange}
                size="small"
              />
            ) : (
              <Typography variant="body1">{userData.email}</Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Phone:</Typography>
            {isEditing ? (
              <TextField
                fullWidth
                variant="outlined"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                size="small"
              />
            ) : (
              <Typography variant="body1">{userData.phone}</Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Address:</Typography>
            {isEditing ? (
              <TextField
                fullWidth
                variant="outlined"
                name="address"
                value={userData.address}
                onChange={handleChange}
                size="small"
              />
            ) : (
              <Typography variant="body1">{userData.address}</Typography>
            )}
          </Box>
        </Box>

        {/* Edit / Save / Cancel Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
          {isEditing ? (
            <>
              <IconButton onClick={handleSaveClick} color="primary">
                <SaveIcon />
              </IconButton>
              <IconButton onClick={handleCancelClick} color="secondary">
                <CancelIcon />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={handleEditClick} color="primary">
              <EditIcon />
            </IconButton>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
