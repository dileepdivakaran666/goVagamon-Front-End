import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext
import {addToCartService, removeCartService, getCartService} from '../services/CartService'

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { isLoggedIn } = useAuth(); // Get login status from AuthContext
    const [cart, setCart] = useState([]); // Store cart items in state
    const [loading, setLoading] = useState(false);

    // ✅ Fetch the cart from backend
    const fetchCart = useCallback(async () => {
        if (!isLoggedIn) return; // Only fetch if user is logged in

        setLoading(true);
        try {
            const response = await getCartService()
            setCart(response.data); // Store cart items in state
        } catch (error) {
            console.error("Error fetching cart:", error.response?.data?.message || error.message);
        }
        setLoading(false);
    },[isLoggedIn]);

    // ✅ Add a resort to the cart
    const addToCart = async (resortId) => {
        try {
           await addToCartService(resortId)
            fetchCart(); // Re-fetch the cart after adding an item
        } catch (error) {
            console.error("Error adding to cart:", error.response?.data?.message || error.message);
        }
    };

    // ✅ Remove a resort from the cart
    const removeFromCart = async (resortId) => {
        try {
            await removeCartService(resortId)
            fetchCart(); // Re-fetch cart after removing item
        } catch (error) {
            console.error("Error removing from cart:", error.response?.data?.message || error.message);
        }
    };

    // ✅ Clear the entire cart
    const clearCart = async () => {
        try {
            
            setCart([]); // Reset cart state
        } catch (error) {
            console.error("Error clearing cart:", error.response?.data?.message || error.message);
        }
    };

    // Fetch cart when user logs in
    useEffect(() => {
        fetchCart();
    }, [isLoggedIn, fetchCart]); // Re-fetch when login status changes

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, loading }}>
            {children}
        </CartContext.Provider>
    );
};

// ✅ Custom hook for using cart
export const useCart = () => useContext(CartContext);
