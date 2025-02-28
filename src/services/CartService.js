import axios from 'axios'

const API_URL='https://go-vagamon-backend.onrender.com'

export const addToCartService = async(resortId)=>{
    await axios.post(`${API_URL}/api/cart/add`,{ resortId },{ withCredentials: true }
    );
}

export const getCartService = async()=>{
    const res = await axios.get(`${API_URL}/api/cart`, {
        withCredentials: true, // Send cookies for authentication
    });
    return res
}

export const removeCartService = async(resortId)=>{
    await axios.delete(`${API_URL}/api/cart/remove/${resortId}`, {
        withCredentials: true,
    });
}

export const clearCartService = async()=>{
    await axios.delete(`${API_URL}/api/cart/clear`, {
        withCredentials: true,
    });
}