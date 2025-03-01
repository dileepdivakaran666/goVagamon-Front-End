import React, { useEffect, useState } from 'react';
import {getSingleResort} from '../services/ApiServices'
import GoogleMapComponent from '../components/GoogleMapComponent';
import { useParams } from 'react-router-dom';
import {useCart} from '../context/CartContext'
import {useAuth} from '../context/AuthContext'
import ReactPlayer from 'react-player';
import { Container, Typography, Button, CircularProgress, Box, Card, CardContent,ImageList,ImageListItem, Dialog, Grid2, List, ListItem, ListItemIcon, ListItemText, Rating } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import RatingComponent from '../components/RatingComponent';
import FavoriteIcon from '@mui/icons-material/Favorite';

// const drawerWidth = 300

const ResortDetailsPage = () => {
  const { id } = useParams();
  const [resort, setResort] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const {isLoggedIn} = useAuth()
  const {cart, addToCart, removeFromCart} = useCart()


  const handleClickOpen = (photo) => {
    setSelectedImage(photo);
    setOpen(true);
  };

  useEffect(() => {
    const fetchResortDetails = async () => {
      try {
        const response = await getSingleResort(id); // Replace with your API endpoint
        setResort(response.data);
      } catch (error) {
        console.error('Error fetching resort details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResortDetails();
  }, [id]);

  const handleCartToggle = (resortId)=>{
    const isInCart = cart?.some(item => item._id === resortId);
    
    console.log(cart)
    if(!isLoggedIn){
      alert('Please Login for ')
      return
    }
    if(isInCart){
      removeFromCart(resortId)
    }
    else{
      addToCart(resortId)
    }

  }

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!resort) {
    return <Typography variant="h6">Resort not found.</Typography>;
  }

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  return (
    <Container sx={{ flexGrow: 1, p: 3, mt:4}}>
        <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center"
        }}
      >
        <Typography variant="h3" gutterBottom align="left" sx={{ mt: 4 }}>
            {resort.name}
        </Typography >
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <IconButton
                    onClick={(e) => {e.stopPropagation();
                      handleCartToggle(id)}} // Call the addToCart function
                  >
                  {cart?.some(item => item._id === id) ? (
                    <FavoriteIcon sx={{ color: "blue" }} />
                  ) : (
                    <FavoriteBorderIcon color="primary" />
                  )}
                </IconButton>
                <Button variant="contained" color="primary" size="large" sx={{ml:3, textTransform: 'none'}}>
                    Book Now
                </Button>
            </Box>
      </Box>
      
      <Typography variant="body1" sx={{ mt: 2, display:'flex', justifyContent:'start' }}>
            <LocationOnIcon sx={{color:'blue'}}/> {resort.location}
      </Typography>
    <Box sx={{display: 'flex', flexDirection:'row', gap: 2}}>
        <ImageList
            sx={{ width: {xs: "100%", sm: "70%", md: "70%", lg: "70%", xl: "70%"}, height: 450 }} // Adjust height as needed
            variant="quilted"
            cols={3} // Number of columns
            gap={8}
            rowHeight={121} // Height of each row
        >
            {resort.photos.map((photo, index) => (
            <ImageListItem
                key={index}
                cols={index === 0 ? 2 : 1} // Example: Make every 3rd image span 2 columns
                rows={index === 0 ? 3 : 1} // Example: Make every 3rd image span 2 rows
                sx={{ borderRadius: '10px', overflow: 'hidden' }}
                onClick={() => handleClickOpen(photo)}
            >
                <img
                {...srcset(photo, 121, index % 3 === 0 ? 2 : 1, index % 3 === 0 ? 2 : 1)}
                alt={`Resort ${index + 1}`}
                loading="lazy"
                />
            </ImageListItem>
            ))}
        </ImageList>


        <Box>
            <Box sx={{mb:2}}>
              <Typography color="text.secondary" sx={{display: "flex", alignItems: "center", textAlign: 'left'}}>
                Rating: <Rating value={resort.averageRating} precision={0.5} readOnly />
               </Typography>
            </Box>
            <GoogleMapComponent/>
        </Box>
    </Box>


      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
            backgroundColor: "black",
          }}
        >
          <CloseIcon />
        </IconButton>
        <img src={selectedImage} alt="Resort View" style={{ width: "100%", height: "auto" }} />
      </Dialog>

      <Card>  
        <CardContent>
          <Typography variant="h5" component="div">
          ₹{resort.price} per night
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Rating: {resort.rating}
          </Typography>
          
          <Typography variant="body1" sx={{ mt: 2 }}>
            Description: {resort.description}
          </Typography>
          <Grid2 container spacing={2}>
        <Grid2 item xs={12} md={6}>
          <List>
            {resort.amenities.map((amenity, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" /> {/* Icon for each amenity */}
                </ListItemIcon>
                <ListItemText primary={amenity} />
              </ListItem>
            ))}
          </List>
        </Grid2>
      </Grid2>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Videos
      </Typography>
      <Box sx={{ flexGrow: 1, px: 3 }}>
        <Grid2 container spacing={3} justifyContent="center">
          {resort.videos.map((video, index) => (
            <Grid2 item key={index} xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ width: "250px", // Fixed width for uniformity
                  height: "200px", // Fixed height
                  borderRadius: 2,
                  overflow: "hidden",
                  mx: "auto", // Center align 
                  }}
              >
                <ReactPlayer
                  url={video} // Video URL
                  controls // Show play/pause controls
                  width="100%"
                  height="200px"
                />
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      <Box>  
        <RatingComponent resortId={id}/>
      </Box>

    </Container>
  );
};

export default ResortDetailsPage;