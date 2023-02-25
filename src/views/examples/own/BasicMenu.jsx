import * as React from 'react';
import '../../../assets/css/pattern.css';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { IonIcon } from 'react-ion-icon';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import Avatar from 'boring-avatars';

export default function BasicMenu({username}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    window.location.href = '/MyPooling-FE'
  }

  return (
    <div className='align-center space-around display-flex border-radius-5'>
      <Button
        id="basic-demo-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color=""
        onClick={handleClick}
      >
        <div>
          <Avatar
            size={"30px"}
            name={username}
            variant="beam"
            colors={["#69C2FF", "#50B5F6", "#42A6EE", "#5EB4F2", "#439FDF"]}
          />
        </div>
        <span><IonIcon name="search-outline"/></span>
      </Button>
        <Menu
          id="basic-menu"
          style={{width: 114, border: 'none', boxShadow: '-2px -2px 12px -5px rgba(110,110,110,0.14)', borderRadius: 5, backgroundColor: 'white'}}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          aria-labelledby="basic-demo-button"
        >
          <MenuItem 
            style={{fontSize: 15.4, fontWeight: 400, fontFamily: 'League Spartan'}} 
            onClick={() => {window.location.href = "/MyPooling-FE/profile/"+jwt(window.localStorage.getItem('token')).sub.username; 
            handleClose()
          }}>Account</MenuItem>
          <MenuItem style={{fontSize: 15.4, fontWeight: 400, fontFamily: 'League Spartan'}} onClick={() => {logout(); handleClose()}}>Logout</MenuItem>
        </Menu>
    </div>
  );
}