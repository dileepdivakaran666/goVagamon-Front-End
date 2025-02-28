import React, { createContext, useState, useContext, useEffect } from 'react';
import {logoutUser, getUserDetail } from '../services/ApiServices'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProp, setUserProp] = useState({userId: null, role: null, username: null})
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    getUser();
  }, []); // Empty dependency array ensures this runs only once



  const getUser = async () => {
    try {
      const res = await getUserDetail()

      // Access the response data correctly
      const { userId, role, username } = res.data;

      // Update state
      setIsLoggedIn(true);
      setUserProp({ userId, role, username });
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
    setLoading(false)
  };

  const handleLogin = async () => {
    await getUser()
    setIsLoggedIn(true);
  };

  const handleLogout = async() => {
    try{
      const res = await logoutUser()
      alert(res.data.message)
      setIsLoggedIn(false);
    }catch(err){
      alert(err.message)
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout, getUser, userProp, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);