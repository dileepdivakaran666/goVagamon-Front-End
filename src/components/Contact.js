import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: "12px" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          Have any questions or feedback? Fill out the form below, and we'll get
          back to you soon.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            type="email"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Your Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="submit" variant="contained" sx={{textTransform:"none", backgroundColor: "#1976d2", "&:hover": { backgroundColor: "blue" } }} fullWidth>
              Send Message
            </Button>
          </motion.div>
        </Box>
      </Paper>
    </Container>
  );
};

export default Contact;
