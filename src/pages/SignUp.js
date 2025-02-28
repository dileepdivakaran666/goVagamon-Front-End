import React, { useState } from 'react';
import {registerUser} from '../services/ApiServices'
import { Container, Typography, TextField, Button, Box,IconButton, InputAdornment, Alert, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return; // Stop submission
    } else {
      setEmailError(''); // Clear the error if valid
    }
    console.log('Signup Data:', { username, email, password });
    try{
        const response = await registerUser(username, email, password);
        if (response.status === 200 || response.status === 201) {
            alert(response.data.message)
               }
          navigate('/login')
    }catch(err){
      setError(err)
    }
    
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={!!emailError}  //  !! converts the string to boolean
            helperText={emailError}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{  // Add InputProps for the password visibility toggle
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }} 
          />
          {
            error && <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{error}</Alert>
          </Stack>
          }
          
          <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Signup;