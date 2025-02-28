import React from 'react'
import {BeatLoader} from 'react-spinners'
import {Navigate, Outlet} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

function ProtectedRoute({ children, adminOnly = false }) {
    const {userProp, loading} =  useAuth()

    if (loading) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <BeatLoader color="#36d7b7" /> {/* Replace with your preferred spinner */}
          </div>
        );
      }

    if(!userProp){
        return <Navigate to='/login'/>
    }
    if (adminOnly && userProp.role !== 'admin') {
        return <Navigate to="/" />; // Redirect to home if not an admin
      }
    
    return children ? children :<Outlet />; // Render the child routes if authenticated
}

export default ProtectedRoute