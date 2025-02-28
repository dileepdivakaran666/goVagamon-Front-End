import React from "react";
import { Box, Typography, Container, Paper, Grid2 } from "@mui/material";
import { motion } from "framer-motion";
import aboutImage from "../assets/vaga-para1.jpg";
import img1 from '../assets/vagamon1.jpeg'


const About = () => {
  return (
    <Box>
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "60vh",
          backgroundImage: `url(${aboutImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
         
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h3" fontWeight="bold" sx={{ zIndex: 1 }}>
              Welcome to goVagamon
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, zIndex: 1 }}>
              Explore. Experience. Escape. Discover the best stays and adventures in Vagamon.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* About Content Section */}
      <Container sx={{ mt: 6, mb: 6 }}>
        <Grid2 container spacing={2} alignItems="center" sx={{ width: '100%', margin: 0 }}>
          <Grid2 size={6} item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Paper elevation={4} sx={{ p: 4, borderRadius: "12px" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Why Choose goVagamon?
                </Typography>
                <Typography variant="body1" paragraph>
                  goVagamon is the ultimate travel companion for those looking to experience the untouched beauty of Vagamon. We connect travelers with top-rated **resorts, homestays, and tent houses** to ensure a seamless and memorable stay.
                </Typography>
                <Typography variant="body1" paragraph>
                  Whether you're an adventure seeker, a nature lover, or someone looking for a peaceful retreat, our platform provides everything you need to book your perfect stay.
                </Typography>
                <Typography variant="body1">
                  With goVagamon, your dream getaway is just a click away!
                </Typography>
              </Paper>
            </motion.div>
          </Grid2>

          {/* Image Section */}
          <Grid2 size={6} item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: 3,
                }}
              >
                <img
                  src={img1}
                  alt="Vagamon Resort"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </motion.div>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default About;
