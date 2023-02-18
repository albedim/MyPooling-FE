import * as React from 'react';
import './style/pattern.css';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { IonIcon } from 'react-ion-icon';
import { useNavigate } from 'react-router-dom';

export default function BasicMenu({userName}) {
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
    navigate("/")
  }

  const navigate = useNavigate()

  return (
    <div>
      <Button
        id="basic-demo-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="fill"
        className='font-size-14 font-family'
        color="neutral"
        onClick={handleClick}
      >
        <span className='font-size-17 font-family'>{userName}</span>
        <span className='margin-left-14' ><IonIcon name="chevron-down-outline"/></span>
      </Button>
        <Menu
          id="basic-menu"
          style={{width: 114, border: 'none', boxShadow: '-2px -2px 12px -5px rgba(110,110,110,0.14)', borderRadius: 5, backgroundColor: 'white'}}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          aria-labelledby="basic-demo-button"
        >
          <MenuItem style={{fontSize: 15.4, fontWeight: 400, fontFamily: 'League Spartan'}} onClick={() => {navigate("/account"); handleClose()}}>Account</MenuItem>
          <MenuItem style={{fontSize: 15.4, fontWeight: 400, fontFamily: 'League Spartan'}} onClick={() => {navigate("/dashboard"); handleClose()}}>Dashboard</MenuItem>
          <MenuItem style={{fontSize: 15.4, fontWeight: 400, fontFamily: 'League Spartan'}} onClick={() => {logout(); handleClose()}}>Logout</MenuItem>
        </Menu>
    </div>
  );
}