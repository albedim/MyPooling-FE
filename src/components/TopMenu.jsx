import { Menu, MenuItem } from "@mui/joy";
import Flag from "react-flagkit";
import { IonIcon } from "react-ion-icon";

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 09/02/23
 * Created at: 16:34
 * Version: 1.0.0
 * Description: This is thw component of the top menu
 */


export const TopMenu = () => {

  return(
    <div className="white-backgroundcolor box-shadow height-90 display-flex space-between white-bakcground display-flex space-between position-fixed width-full">
      <div className="display-flex space-around align-center width-240"><img className="width-64" src="icon.png" alt="" /></div>
      <div className="display-flex width-640">
        <div className="width-170 display-flex space-around align-center">
          <span className="hover font-weight-500 blue-color font-family font-size-17">Come funziona</span>
        </div>
        <div className="width-170 display-flex space-around align-center">
          <span className="hover font-weight-500 blue-color font-family font-size-17">Aggiungi una tratta</span>
        </div>
        <div className="font-size-21 display-flex space-around align-center width-84">
          <span className="hover"><IonIcon name="heart-outline"/></span>
        </div>
        <div className="display-flex space-around align-center width-124">
          <div className="display-flex space-between width-80 hover">
            <span className="font-family font-size-17">Alberto</span>
            <IonIcon name="chevron-down-outline"/>
          </div>
        </div>
      </div>
    </div>
  );

}