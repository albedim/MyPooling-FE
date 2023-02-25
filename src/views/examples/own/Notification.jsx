import * as React from 'react';
import '../../../assets/css/pattern.css';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { IonIcon } from 'react-ion-icon';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { Eye, Notifications } from 'react-ionicons';
import { BASE_URL } from '../../../config.ts';
import axios from 'axios';
import { Badge } from '@mui/material';

export default function Notification() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [unSeen, setUnSeen] = React.useState(5);
  const [notifications, setNotifications] = React.useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNotifications = async () => {
    await axios.get(BASE_URL + "/notification/get/" + jwt(window.localStorage.getItem('token')).sub.user_id)
    .then((response) => {
      setNotifications(response.data)
      getUnSeen(response.data)
    })
    .catch(error => console.log(error));
  }

  const getUnSeen = (notifications) => {
    let counter = 0;
    notifications.map(notification => {
      counter = notification.seen ? counter : counter + 1;
    })
    setUnSeen(counter)
  }

  const markAsSeen = async (notificationId) => {
    await axios.put(BASE_URL + '/notification/mark_as_seen/' + notificationId)
    .then(response => {
      console.log(response.data)
      getNotifications();
    })
    .catch(error => console.log(error))
  }

  React.useEffect(() => {
    getNotifications()
  },[])

  return (
    <div className=''>
      <Button
        id="basic-demo-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color=""
        onClick={handleClick}
      >
        <Badge badgeContent={unSeen} color="primary">
          <Notifications style={{width: 18}} color={"white"}></Notifications>
        </Badge>
      </Button>
      {
        notifications.length == 0 ? (
          <Menu
            id="basic-menu"
            style={{width: 234, border: 'none', boxShadow: '-2px -2px 12px -5px rgba(110,110,110,0.14)', borderRadius: 5, backgroundColor: 'white'}}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            aria-labelledby="basic-demo-button"
          >
            <MenuItem 
              style={{justifyContent: 'space-around', height: 108, alignItems: 'center', display: 'flex'}} 
            >
              <span className='font-size-16 font-family'>Non ci sono notifiche</span>
            </MenuItem>
          </Menu>
        ):(
          <Menu
            id="basic-menu"
            style={{width: 464, border: 'none', boxShadow: '-2px -2px 12px -5px rgba(110,110,110,0.14)', borderRadius: 5, backgroundColor: 'white'}}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            aria-labelledby="basic-demo-button"
          >
            {
              notifications.map(notification => (
                <MenuItem 
                  style={{ height: 108, alignItems: 'center', display: 'flex', fontSize: 15.4, fontWeight: 400, fontFamily: 'League Spartan'}} 
                >
                  <div className='align-center space-around display-flex'>
                    <div className='space-around align-center display-flex margin-left-14'>
                      <Notifications style={{width: 18}} color={"#6cabfd"}></Notifications>
                    </div>
                    <div className='space-around align-center display-flex margin-left-14'>
                      <span className="font-family">@{notification.body}</span>
                    </div>
                    {
                      !notification.seen &&
                        <div className='space-around align-center display-flex margin-left-14'>
                          <button onClick={(e) => markAsSeen(notification.notification_id)} className='ok-backgroundcolor border-radius-5 blue-color blue-border border-smaller'><Eye color={"#6cabfd"} style={{width: 14}}></Eye></button>
                        </div>
                    }
                  </div>
                </MenuItem>
              ))
            }
          </Menu>
        )
      }
    </div>
  );
}