import React from "react";
import { Container, Grid2, Typography, Box, Link, IconButton } from "@mui/material";
import { Facebook, Instagram, YouTube } from "@mui/icons-material";
import XIcon from '@mui/icons-material/X';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: "primary.main", color: "white", py: 4, mt: 5, bottom:0, right:0 }}>
            <Container maxWidth="lg">
                <Grid2 container spacing={3} justifyContent="center">
                    {/* About Section */}
                    <Grid2 item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            About goVagamon
                        </Typography>
                        <Typography variant="body2">
                            goVagamon helps you find and book the best resorts and homestays in Vagamon.
                            Discover breathtaking destinations and enjoy hassle-free booking.
                        </Typography>
                    </Grid2>

                    {/* Quick Links */}
                    <Grid2 item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Box display="flex" flexDirection="column">
                            <Link href="/" color="inherit" underline="hover">Home</Link>
                            <Link href="/about" color="inherit" underline="hover">About Us</Link>
                            <Link href="/contact" color="inherit" underline="hover">Contact</Link>
                        </Box>
                    </Grid2>

                    {/* Social Media */}
                    <Grid2 item xs={12} sm={4} textAlign="center">
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Box>
                            <IconButton href="https://www.facebook.com/dileep.divakaran.666" target="_blank" color="inherit">
                                <Facebook />
                            </IconButton>
                            <IconButton href="https://www.instagram.com/dra_con_ian/" target="_blank" color="inherit">
                                <Instagram />
                            </IconButton>
                            <IconButton href="https://x.com/dileeDiva" target="_blank" color="inherit">
                                <XIcon/>
                            </IconButton>
                            <IconButton href="https://youtube.com" target="_blank" color="inherit">
                                <YouTube />
                            </IconButton>
                        </Box>
                    </Grid2>
                </Grid2>

                {/* Copyright */}
                <Box mt={4} textAlign="center">
                    <Typography variant="body2">
                        © {new Date().getFullYear()} goVagamon. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
