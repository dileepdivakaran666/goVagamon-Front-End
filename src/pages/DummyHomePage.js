import React from 'react'
import { Box, Typography, Button, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import img1 from '../assets/vaga-para1.jpg'
import img2 from '../assets/vaga-para2.jpg'
import img3 from '../assets/vaga-para3.jpg'
import img4 from '../assets/vaga-para4.png'

const resorts1 = [
    {
      id: 1,
      name: "Green Valley Resort",
      image: img1,
      description: "Enjoy the serene beauty of Vagamon with luxurious stays.",
    },
    {
      id: 2,
      name: "Mountain View Homestay",
      image: img2,
      description: "A perfect stay for nature lovers with an amazing view.",
    },
    {
      id: 3,
      name: "Sunset Tent House",
      image: img3,
      description: "Experience adventure with our cozy and scenic tent stays.",
    },
    {
      id: 4,
      name: "Sunset Tent House",
      image: img4,
      description: "Experience adventure with our cozy and scenic tent stays.",
    }
  ];

function DummyHomePage() {
  return (
    <Box>
    <Typography variant="h4" sx={{ mb: 2 }}>Dummy Resorts</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 3 }}>
        {resorts1.map((resort) => (
          <Card key={resort.id} sx={{ maxWidth: 300, height: 400, position: 'relative' }}>
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(238, 235, 235, 0.8)', // Semi-transparent background
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }, // Solid background on hover
              }}
            >
              <FavoriteBorderIcon color="primary" /> {/* Cart icon */}
            </IconButton>
            <CardMedia component="img" sx={{ width: '100%',height:'50%', objectFit: 'cover' }} image={resort.image} alt={resort.name} />
            <CardContent>
              <Typography variant="h6">{resort.name}</Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Price: ${resort.price}
                </Typography>
                <Typography color="text.secondary">
                  Rating: {resort.rating}
                </Typography>
              <Typography variant="body2" color="text.secondary">{resort.description}</Typography>
              <Button variant="contained" sx={{ mt: 2,textTransform: 'none' }}>See availability</Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      </Box>
  )
}

export default DummyHomePage

