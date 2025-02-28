import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, IconButton } from "@mui/material";
import { Dashboard, Home, Settings, Logout, Menu as MenuIcon, ChevronLeft } from "@mui/icons-material";

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const drawerWidth = isExpanded ? 240 : 64;

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const menuItems = [
        { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
        { text: "Home", icon: <Home />, path: "/" },
        { text: "Settings", icon: <Settings />, path: "/settings" },
        { text: "Logout", icon: <Logout />, path: "/logout" }
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                zIndex: 1201, // Ensure it's above content
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    transition: "width 0.3s ease",
                    overflowX: "hidden",
                    marginTop: "64px" // ✅ Pushes Sidebar below AppBar
                }
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: isExpanded ? "flex-end" : "center", alignItems: "center" }}>
                <IconButton onClick={toggleSidebar}>
                    {isExpanded ? <ChevronLeft /> : <MenuIcon />}
                </IconButton>
            </Toolbar>

            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
                        <ListItemButton href={item.path} sx={{ justifyContent: isExpanded ? "initial" : "center", px: 2.5 }}>
                            <ListItemIcon sx={{ color: 'DodgerBlue',minWidth: 0, mr: isExpanded ? 2 : "auto" }}>{item.icon}</ListItemIcon>
                            {isExpanded && <ListItemText primary={item.text} />}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
