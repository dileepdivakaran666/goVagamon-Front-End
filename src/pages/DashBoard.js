import React from "react";
import { Box, CssBaseline } from "@mui/material";
import HomePage from "./HomePage";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const Dashboard = () => {
    return (
        <>
            <CssBaseline />

            {/* Main Layout Wrapper (Flexbox for full height) */}
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}> 

                {/* Header / AppBar (If you have one, place it here) */}

                {/* Sidebar & Content Wrapper */}
                <Box sx={{ display: "flex", flexGrow: 1, marginTop: "64px" }}> 
                    {/* Sidebar (If applicable) */}
                    {/* <Sidebar /> */}

                    {/* Main Content */}
                    <Box 
                        component="main" 
                        sx={{ 
                            flexGrow: 1,  
                            width: { sm: `calc(100% - ${drawerWidth}px)` },
                        }}
                    >
                        <HomePage />
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Dashboard;
