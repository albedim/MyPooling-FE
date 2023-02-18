import axios from 'axios';
import { BASE_URL } from '../config.ts'
import { useState } from 'react';
import './style/pattern.css';
import './style/style.css';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { SpinnerCircular } from 'spinners-react';

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 06/02/23
 * Created at: 00:34
 * Version: 1.0.0
 * Description: This is the component of the signin
 */

export const Signup = () => {

  const [signupData, setSignupData] = useState({
    'email': "",
    "username": "",
    "name": "",
    'password': ""
  })

  const [isLoading, setIsLoading] = useState(false)

  const [openAlert, setOpenAlert] = useState(false)

  const [messageAlert, setMessageAlert] = useState("")

  const [typeAlert, setTypeAlert] = useState("");

  const navigate = useNavigate()

  const handleSignupData = (e) => {
    const newSignupData = {...signupData};
    newSignupData[e.target.name] = e.target.value;
    setSignupData(newSignupData);
  }

  const signup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.post(BASE_URL + '/user/signup', signupData)
    .then(response => {
      setOpenAlert(true)
      setMessageAlert("Account creato con successo")
      setTypeAlert("success")
      setTimeout(() => {
        setIsLoading(false)
        navigate("/")
      }, 2400);
    })
    .catch(error => {
      setOpenAlert(true);
      setMessageAlert("Esiste già un account con queste credenziali")
      setTypeAlert("error")
      setIsLoading(false)
      console.log(error)
    })
  }

  return(
    <div className='display-flex space-around align-center width-full height-full'>
      <div className='white-backgroundcolor border-radius-10 height-534 width-340'>
        <div className='display-flex space-around align-center height-80'><h2 className='font-family font-weight-600 font-size-18'>LOGIN</h2></div>
        <div className='display-flex space-around height-214'>
          <div>
            <div className='display-flex height-84 width-240'>
              <div className='height-40 width-40'>
                <label className='font-weight-500 font-size-14 font-family' htmlFor="">EMAIL</label>
                <input onChange={(e) => handleSignupData(e)} value={signupData.email} className='font-size-16 border-none blue-border border-bottom-smaller margin-top-4 height-34 width-190' type="email" name="email" id="" />
              </div>
            </div>
            <div className='display-flex height-84 width-240'>
              <div className='height-40 width-40'>
                <label className='font-weight-500 font-size-14 font-family' htmlFor="">USERNAME</label>
                <input onChange={(e) => handleSignupData(e)} value={signupData.username} className='font-size-16 border-none blue-border border-bottom-smaller margin-top-4 height-34 width-190' type="email" name="username" id="" />
              </div>
            </div>
            <div className='display-flex height-84 width-240'>
              <div className='height-40 width-40'>
                <label className='font-weight-500 font-size-14 font-family' htmlFor="">NAME</label>
                <input onChange={(e) => handleSignupData(e)} value={signupData.name} className='font-size-16 border-none blue-border border-bottom-smaller margin-top-4 height-34 width-190' type="email" name="name" id="" />
              </div>
            </div>
            <div className='display-flex height-84 width-240'>
              <div className='height-40 width-40'>
                <label className='font-weight-500 font-size-14 font-family' htmlFor="">PASSWORD</label>
                <input onChange={(e) => handleSignupData(e)} value={signupData.password} className='font-size-16 border-none blue-border border-bottom-smaller margin-top-4 height-34 width-190' type="password" name="password" id="" />
              </div>
            </div>
            <div className='display-flex space-around align-center height-100'>
              {
                signupData.email == "" || signupData.password == "" || signupData.username == "" || signupData.name == "" ? (
                  <button onClick={(e) => signup(e)} className='opacity-30 font-family border-none white-color blue-backgroundcolor border-radius-5 height-44 width-140'>REGISTRATI</button>
                ):(
                  isLoading ? (
                    <button onClick={(e) => signup(e)} className='space-around display-flex opacity-30 font-family border-none white-color blue-backgroundcolor border-radius-5 height-44 width-140'>
                      <SpinnerCircular size={20} color='white' thickness={200} secondaryColor={'blue'} />
                    </button>
                  ):(
                    <button onClick={(e) => signup(e)} className='hover font-family border-none white-color blue-backgroundcolor border-radius-5 height-44 width-140'>REGISTRATI</button>
                  )
                )
              }
            </div>
          </div>
        </div>
      </div>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openAlert} autoHideDuration={3000} onClose={(e) => setOpenAlert(false)}>
        <Alert severity={typeAlert} sx={{ width: '340px' }}>
          {messageAlert}
        </Alert>
      </Snackbar>
    </div>
  )
}