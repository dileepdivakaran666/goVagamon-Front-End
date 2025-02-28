import axios from "axios";

const API_URL = "https://go-vagamon-backend.onrender.com";

// Function to Register User
export const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/signup`, { username, email, password });
        return response;  // Return response data
    } catch (error) {
        throw error.response?.data?.message || "Registration failed";
    }
};

export const loginUser = async (email, password) => {
    try{
        const response = await axios.post(`${API_URL}/api/auth/login`,{email,password},{ withCredentials: true })
        return response
    } catch (error){
        throw error.response?.data?.message || "Login failed";
    }
}

export const logoutUser = async()=>{
  try{
    const res = await axios.post(`${API_URL}/api/auth/logout`,{}, { withCredentials: true })
    return res
  }catch(err){
    return err
  }
}

export const getUserDetail = async()=>{
  try{
    const res = await axios.get(`${API_URL}/api/auth/user`, { withCredentials: true });
    return res
  }catch(err){
    return err
  }
}

export const userList = async()=>{
    try{
        const response = await axios.get(`${API_URL}/api/admin/user`,{ withCredentials: true })
        return response
    } catch (error){
        throw error.response?.data?.message || "userList getting faild";
    }
}

export const addResort = async (name, description, location, amenities, price, photos, videos) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('location', location);
    data.append('price', price)

    data.append('amenities', amenities.join(','));

    // Append each file to the FormData object
    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        data.append('photos', photos[i]);
      }
    }
    if(videos){
        for(let i=0; i<videos.length; i++){
            data.append('videos', videos[i])
        }
    }

    try {
      const res = await axios.post(`${API_URL}/api/admin/resort`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file uploads
        },
      });
      return res; // Return the response data
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to add resort');
    }
  }

export const getresorts = async()=>{
  try{
    const response = await axios.get(`${API_URL}/api/resort/`,{ withCredentials: true })
    return response.data.allResorts
} catch (error){
    throw error.response?.data?.message || "Resorts Loading Failed";
}
} 

export const getSingleResort = async(id)=>{
  try{
    const response = await axios.get(`${API_URL}/api/resort/${id}`,{ withCredentials: true })
    return response
} catch (error){
    throw error.response?.data?.message || "Resort Loading Failed";
}
} 


export const addToCartService = async (resortId) => {
  try {
    const response = await axios.post(`${API_URL}/api/resort/add-to-cart`, {resortId},{ withCredentials: true });

    console.log('Added to cart:', response.data);
    alert('Added to cart successfully!');
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('Failed to add to cart. Please try again.');
  }
};

export const getCartService = async()=>{
  try{
    const res = await axios.post(`${API_URL}/api/resort/carts`,{},{withCredentials: true})
    return res
  }catch(err){
    console.log(err)
  }
}


export const getRatings =async(resortId)=>{
  try{
   const res = await axios.get(`${API_URL}/api/ratings/${resortId}`)
   return res
  }
  catch(err){
    console.log(err)
  }
}

export const submitRating = async(resortId, rating, comment)=>{
  try{
    const res = await axios.post(`${API_URL}/api/ratings/${resortId}/rate`, {rating, comment}, {withCredentials:true})
    return res
   }
   catch(err){
     console.log(err)
   }
}