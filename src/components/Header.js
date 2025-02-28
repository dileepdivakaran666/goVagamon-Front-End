import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';


function Header() {

  const {isLoggedIn, handleLogout} = useAuth()
  const navigate = useNavigate()


  return (
    <div>
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,cursor: "pointer" }} onClick={()=>navigate('/')}>
            goVagamon
          </Typography>
          

          <Button color="inherit" component={Link} to="/about" sx={{textTransform:"none", mr:4}}>About Us</Button>
          <Button color="inherit" component={Link} to="/contact" sx={{textTransform:"none", mr:4}}>Contact Us</Button>
          {
            isLoggedIn? <>
            <Button color="inherit" component={Link} to="/cart"><FavoriteBorderIcon sx={{mr:4}}/></Button>
            <Button color="inherit" onClick={handleLogout} sx={{textTransform:"none"}}><PowerSettingsNewIcon/></Button>
            </>
            :<>
          <Button color="inherit" component={Link} to="/login" sx={{textTransform:"none"}}>Login</Button>
          <Button color="inherit" component={Link} to="/signup" sx={{textTransform:"none"}}>Sign Up</Button>
          </>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header