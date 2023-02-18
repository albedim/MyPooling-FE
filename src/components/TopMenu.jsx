import { useEffect } from "react";
import jwt from 'jwt-decode'
import Flag from "react-flagkit";
import { IonIcon } from "react-ion-icon";
import { useNavigate } from "react-router-dom";
import BasicMenu from "./BasicMenu";
import TabsBasic from "./TabsBasic";

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 09/02/23
 * Created at: 16:34
 * Version: 1.0.0
 * Description: This is thw component of the top menu
 */


export const TopMenu = () => {

  const navigate = useNavigate()

  return(
    <div className="z-index-1 white-backgroundcolor box-shadow height-90 display-flex space-between white-bakcground display-flex space-between position-fixed width-full">
      <div className="display-flex space-around align-center width-240"><img className="width-64" src="icon.png" alt="" /></div>
      <div className="display-flex width-640">
        <div className="width-84 display-flex space-around align-center">
          <span className="hover font-weight-500 blue-color font-family font-size-17">Home</span>
        </div>
        <div className="width-170 display-flex space-around align-center">
          <span className="hover font-weight-500 blue-color font-family font-size-17">Dai un paassaggio</span>
        </div>
        <div className="font-size-21 display-flex space-around align-center width-64">
          <span className="hover"><IonIcon name="heart-outline"/></span>
        </div>
        <div className="font-size-21 display-flex space-around align-center width-64">
          <span className="hover"><IonIcon name="notifications-outline"/></span>
        </div>
        <div className="display-flex space-around align-center width-124">
          <div className="display-flex space-between width-80 hover">
            {
              window.localStorage.getItem('token') != null ? (
                <BasicMenu userName={jwt(window.localStorage.getItem('token')).sub.name} />
              ):(
                <button onClick={(e) => navigate("/signin")} className="hover white-backgroundcolor border-radius-5 border-smaller blue-color border-blue height-34 width-140">Entra</button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );

}