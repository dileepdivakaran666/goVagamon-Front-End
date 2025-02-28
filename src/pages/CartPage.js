import React from "react";
import { useCart } from "../context/CartContext";
import { 
    Container, 
    Typography, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Avatar, 
    IconButton, 
    Button, 
    CircularProgress, 
    Box, 
    Paper 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
    const { cart, removeFromCart, clearCart, loading } = useCart();

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{mt:10}}>
            <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Your Favorite Resorts
                </Typography>

                {cart.length === 0 ? (
                    <Typography variant="h6" align="center">
                        Your Favorite is empty.
                    </Typography>
                ) : (
                    <>
                        <List>
                            {cart.map((resort) => (
                                <ListItem 
                                    key={resort._id} 
                                    sx={{ 
                                        display: "flex", 
                                        justifyContent: "space-between", 
                                        borderBottom: "1px solid #ddd" 
                                    }}
                                >
                                    {/* Resort Image */}
                                    <ListItemAvatar>
                                        <Avatar 
                                            src={resort.photos} 
                                            alt={resort.name} 
                                            sx={{ width: 64, height: 64, borderRadius: 1 }}
                                        />
                                    </ListItemAvatar>

                                    {/* Resort Name & Location */}
                                    <ListItemText
                                        primary={resort.name}
                                        secondary={resort.location}
                                        sx={{ ml: 4 }}
                                        
                                    />

                                    {/* Remove Button */}
                                    <IconButton 
                                        edge="end" 
                                        aria-label="delete" 
                                        onClick={() => removeFromCart(resort._id)}
                                    >
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>

                        {/* Clear Cart Button */}
                        <Box display="flex" justifyContent="center" mt={3}>
                            <Button 
                                variant="contained" 
                                color="error" 
                                onClick={clearCart}
                                sx={{textTransform: 'none'}}
                            >
                                Clear Cart
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default CartPage;
