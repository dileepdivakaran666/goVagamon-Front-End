import React, { useState } from 'react';
import { addResort } from '../services/ApiServices';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { TextField, Button, Typography, Paper, Box, Grid2, FormControlLabel, Checkbox } from '@mui/material';

const AddResortPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    amenities: [], // Array of selected amenities
    price: '', // Price per night
    photos: null, // Change this to handle file(s)
    videos: null
  });

  const AMENITIES_LIST = [
    'Swimming Pool',
    'Free Wi-Fi',
    'Spa',
    'Gym',
    'Restaurant',
    'Bar',
    'Air Conditioning',
    'Parking',
    'Pet-Friendly',
    'Beach Access',
  ];

  const handleChange = (e) => {
    if (e.target.name === 'photos') {
      // Handle file input
      setFormData({ ...formData, photos: e.target.files });
    }
    else if (e.target.name === 'videos'){
      setFormData({ ...formData, videos: e.target.files });
    }
    else {
      // Handle other inputs
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prevData) => {
      const amenities = prevData.amenities.includes(amenity)
        ? prevData.amenities.filter((a) => a !== amenity) // Remove if already selected
        : [...prevData.amenities, amenity]; // Add if not selected
      return { ...prevData, amenities };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addResort(formData.name, formData.description, formData.location,formData.amenities, formData.price, formData.photos, formData.videos)
      alert(res.data.message);
      setFormData({ name: '', description: '', location: '',amenities: [],
        price: '', photos: null, videos: null }); // Reset form
    } catch (err) {
      alert('Failed to add resort');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Resort
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Resort Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Price per Night"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Amenities
            </Typography>
            <Grid2 container spacing={2}>
              {AMENITIES_LIST.map((amenity) => (
                <Grid2 item xs={6} sm={4} key={amenity}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        name={amenity}
                      />
                    }
                    label={amenity}
                  />
                </Grid2>
              ))}
            </Grid2>
          </Box>

          {/* File Input for Photos */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Photos
            </Typography>
            <label htmlFor="photos-upload" style={{ display: 'block', marginBottom: '16px' }}>
              <Button  variant="contained" component="span" sx={{ backgroundColor: '#6a1b9a', '&:hover': { backgroundColor: '#4a148c' } }}>
                Upload Photos
                <CloudUploadOutlinedIcon sx={{ml:2}}/>
              </Button>
            </label>
            <input
              id="photos-upload"
              type="file"
              name="photos"
              onChange={handleChange}
              multiple // Allow multiple files
              accept="image/*" // Accept only image files
              style={{ display: 'none' }} // Hide the default file input
            />
          </Box>

          {/* File Input for Videos */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Videos
            </Typography>
            <label htmlFor="videos-upload" style={{ display: 'block', marginBottom: '16px' }}>
              <Button variant="contained" component="span" sx={{ backgroundColor: '#6a1b9a', '&:hover': { backgroundColor: '#4a148c' } }}>
                Upload Videos
                <CloudUploadOutlinedIcon sx={{ml:2}}/>
              </Button>
            </label>
            <input
              id="videos-upload"
              type="file"
              name="videos"
              onChange={handleChange}
              multiple
              accept="video/*"
              style={{ display: 'none' }} 
            />
          </Box>

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Resort
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddResortPage;