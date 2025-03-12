import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleResort, updateResort } from '../services/ApiServices';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';

const EditResortPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    price: ''
  });

  useEffect(() => {
    const fetchResort = async () => {
        try {
          const res = await getSingleResort(id);
          setFormData(res.data);
        } catch (error) {
          console.error('Failed to fetch resort details', error);
        }
      };
    fetchResort();
  }, [id]);

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateResort(id, formData);
      alert('Resort updated successfully!');
      navigate('/admin/edit-resorts');
    } catch (error) {
      console.error('Failed to update resort', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Resort
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} margin="normal" multiline rows={4} required />
          <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Price" name="price" type="number" value={formData.price} onChange={handleChange} margin="normal" required />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Update Resort
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditResortPage;
