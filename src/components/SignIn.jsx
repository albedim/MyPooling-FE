import axios from 'axios';
import { useState } from 'react';
import './style/pattern.css';
import './style/style.css';

/**
 * @author: mattesal <matteoosalvii@gmail.com>
 * Created on: 06/02/23
 * Created at: 00:34
 * Version: 1.0.0
 * Description: This is thw component of the signin
 */

export const SignIn = () => {

  const [loginData, setLoginData] = useState({
    'email_username': "",
    'password': ""
  })

  const handleLoginData = (e) => {
    const newLoginData = {...loginData};
    newLoginData[e.target.name] = e.target.value;
    setLoginData(newLoginData);
  }

  const login = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/v_1_0_5/user/signin', loginData)
    .then(response => {
      console.log(response.data)
      if(response.data.success) {
        //Navigate('/home');
      }else {
        
      }
    })
    .catch(error => {console.log(error)})
  }

  return(
    <div className='display-flex space-around align-center width-full height-full'>
      <div className='border-radius-10 height-380 width-340 border-smaller'>
        <div className='display-flex space-around align-center height-80'><h2 className='font-weight-600 font-size-18'>LOGIN</h2></div>
        <div className='display-flex space-around height-214'>
          <div>
            <div className='display-flex height-40 width-240'>
              <div className='height-40 width-40'>
                
              </div>
              <div className='width-200 height-40'>
                <input className='height-34 width-190' type="text" name="" id="" />
              </div>
            </div>
            <div className='display-flex height-40 width-240'>
              <div className='height-40 width-40'>
                
              </div>
              <div className='width-200 height-40'>
                <input className='height-34 width-190' type="text" name="" id="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}