import axios from 'axios';
import { BASE_URL } from '../config.ts'
import { useState } from 'react';
import './style/pattern.css';
import './style/style.css';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { SpinnerCircular } from 'spinners-react';

/**
 * @author: mattesal <matteoosalvii@gmail.com>
 * Created on: 06/02/23
 * Created at: 00:34
 * Version: 1.0.0
 * Description: This is thw component of the signin
 */

export const SignIn = () => {

  const [loginData, setLoginData] = useState({
    'email': "",
    'password': ""
  })

  const [isLoading, setIsLoading] = useState(false)

  const [openAlert, setOpenAlert] = useState(false)

  const [messageAlert, setMessageAlert] = useState("")

  const [typeAlert, setTypeAlert] = useState("");

  const navigate = useNavigate()

  const handleLoginData = (e) => {
    const newLoginData = {...loginData};
    newLoginData[e.target.name] = e.target.value;
    setLoginData(newLoginData);
  }

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.post(BASE_URL + '/user/signin', loginData)
    .then(response => {
      setOpenAlert(true)
      setMessageAlert("Login effettuato con successo")
      setTypeAlert("success")
      setTimeout(() => {
        setIsLoading(false)
        window.localStorage.setItem('token', response.data.param)
        navigate("/")
      }, 2400);
    })
    .catch(error => {
      setOpenAlert(true);
      setMessageAlert("Credenziali non valide")
      setTypeAlert("error")
      setIsLoading(false)
      console.log(error)
    })
  }

  return(
    <div className='display-flex space-around align-center width-full height-full'>
      <div className='white-backgroundcolor border-radius-10 height-424 width-340'>
        <div className='display-flex space-around align-center height-80'><h2 className='font-family font-weight-600 font-size-18'>LOGIN</h2></div>
        <div className='display-flex space-around height-214'>
          <div>
            <div className='display-flex height-84 width-240'>
              <div className='height-40 width-40'>
                <label className='font-weight-500 font-size-14 font-family' htmlFor="">EMAIL</label>
                <input onChange={(e) => handleLoginData(e)} value={loginData.email} className='font-size-16 border-none blue-border border-bottom-smaller margin-top-4 height-34 width-190' type="email" name="email" id="" />
              </div>
            </div>
            <div className='display-flex height-84 width-240'>
              <div className='height-40 width-40'>
                <label className='font-weight-500 font-size-14 font-family' htmlFor="">PASSWORD</label>
                <input onChange={(e) => handleLoginData(e)} value={loginData.password} className='font-size-16 border-none blue-border border-bottom-smaller margin-top-4 height-34 width-190' type="password" name="password" id="" />
              </div>
            </div>
            <div className='display-flex space-around align-center height-100'>
              {
                loginData.email == "" || loginData.password == "" ? (
                  <button onClick={(e) => login(e)} className='opacity-30 font-family border-none white-color blue-backgroundcolor border-radius-5 height-44 width-140'>ACCEDI</button>
                ):(
                  isLoading ? (
                    <button onClick={(e) => login(e)} className='space-around display-flex opacity-30 font-family border-none white-color blue-backgroundcolor border-radius-5 height-44 width-140'>
                      <SpinnerCircular size={20} color='white' thickness={200} secondaryColor={'blue'} />
                    </button>
                  ):(
                    <button onClick={(e) => login(e)} className='hover font-family border-none white-color blue-backgroundcolor border-radius-5 height-44 width-140'>ACCEDI</button>
                  )
                )
              }
            </div>
            <div className='height-74 display-block'>
              <h2 onClick={(e) => navigate("/signup")} className='hover blue-color font-weight-600 font-size-14 font-family'>Registrati</h2>
              <h2 className='hover gray-color font-weight-500 font-size-14 font-family'>Recupera password</h2>
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