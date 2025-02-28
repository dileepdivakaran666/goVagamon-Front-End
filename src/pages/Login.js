import React, { useState } from 'react';
import {loginUser} from '../services/ApiServices'
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate =useNavigate()
  const { handleLogin, userProp } = useAuth();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    console.log('Login Data:', { email, password });   
    
    try{
      const response = await loginUser(email, password)
      if (response.status === 200 || response.status === 201) {
        alert(response.data.message)
      }
      await handleLogin()

      console.log('User role:', userProp.role);

      if(userProp.role === 'admin'){
        console.log(userProp.role)
        navigate('/admin')
      }
      else{
        console.log(userProp.role)
        navigate('/')
      }

    }
    catch(error) {
        alert("Login failed! " + (error.response?.data?.message || error.message));
    }

  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;