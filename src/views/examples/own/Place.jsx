
/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 07/02/23
 * Created at: 16:34
 * Version: 1.0.0
 * Description: This is thw component of the place
 */

import Avatar from "boring-avatars";

export const Place = ({name, state, country}) => {

  return(
    <div className="hover box-shadow white-backgroundcolor border-radius-5 margin-left-40 height-240 width-340">
      <div className="display-flex space-around align-center height-160">
        <div className="opacity-80 width-110"><Avatar
          size={"30px"}
          name={name}
          variant="beam"
          colors={["#87C7F6", "#50B5F6", "#42A6EE", "#5EB4F2", "#439FDF"]}
        /></div>
      </div>
      <div className="height-80">
        <div className="display-flex align-center height-34 width-240"><h2 className="font-size-18 margin-left-40 font-family">{name.substring(0,17) + "..."}</h2></div>
        <div className="align-center display-flex height-24 width-240"><h4 className="font-size-14 font-weight-400 margin-left-40 gray-color font-family">{state != undefined ? state + ", " + country : country}</h4></div>
      </div>
    </div>
  );

}