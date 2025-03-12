import { useState, useEffect } from "react";
import {getresorts} from '../services/ApiServices'
import { Box, Typography, Button, Card, CardMedia, CardContent, Container, CircularProgress, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Rating } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Banner from "../components/Banner";
import DummyHomePage from "./DummyHomePage";




const HomePage = () => {
  // const [date, setDate] = useState(new Date());
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {isLoggedIn} = useAuth()
  const {cart, addToCart, removeFromCart} = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const response = await getresorts() // Replace with your API endpoint
        setResorts(response);
      } catch (error) {
        console.error('Error fetching resorts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResorts();
  }, []);


  const handleCartToggle = (resortId)=>{
    const isInCart = cart?.some(item => item._id === resortId);
    
    console.log(cart)
    if(!isLoggedIn){
      alert('Please Login for enable this feature')
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

  return (
    <Box sx={{ textAlign: "center" }}>
      
      <Box sx={{height: '50vh', mt: 0}}>
        <Banner/> 
      </Box>

      {/* Resorts List */}
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 3, mt:10 }}>
  {resorts.map((resort) => (
    <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
      <Card key={resort._id} sx={{ width: 300, height: 400, position: 'relative' }} onClick={() => navigate(`/resort/${resort._id}`)}> {/* Fixed width */}
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(238, 235, 235, 0.8)', // Semi-transparent background
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }, // Solid background on hover
        }}
        onClick={(e) => {e.stopPropagation();
          handleCartToggle(resort._id)}} // Call the addToCart function
      >
        {cart?.some(item => item._id === resort._id) ? (
          <FavoriteIcon sx={{ color: "blue" }} />
        ) : (
          <FavoriteBorderIcon color="primary" />
        )}
      </IconButton>
      <CardMedia
        component="img"
        height="180"
        image={resort.photos[0]}
        alt={resort.name}
        sx={{ width: '100%',height:'50%', objectFit: 'cover' }} // Ensure image fills the card width
      />
      <CardContent>
        <Typography variant="h5" color="primary.main" sx={{ fontFamily: 'BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 'bold', textAlign:'left' }}>
          {resort.name}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, textAlign:'left' }}>
          Price: ₹ <span style={{ color: 'blue', fontWeight: 'bold' }}>{resort.price}</span>
        </Typography>

        <Typography color="text.secondary" sx={{display: "flex", alignItems: "center",textAlign: 'left'}}>
         Rating: <Rating value={resort.averageRating} precision={0.5} readOnly />
        </Typography>

        <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: 'left'}}>
        Only 1 room left at this price on our site
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2, textTransform: 'none' }}
          onClick={() => navigate(`/resort/${resort._id}`)}
        >
          See availability
        </Button>
      </CardContent>
    </Card>
    </motion.div>
  ))}
</Box>

        {/* dummydata */}

      <DummyHomePage/>

    </Box>
  );
};

export default HomePage;
