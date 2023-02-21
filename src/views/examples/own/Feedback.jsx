import { Rating } from "@mui/material";
import { IonIcon } from "react-ion-icon";
import { redirect, useNavigate } from "react-router-dom";

export const Feedback = ({anonymous, creator, thought, stars}) => {

  const navigate = useNavigate();

  return(
    <div className="width-344 min-height-124 height-auto">
      <div className="box-shadow border-radius-5 height-auto width-340">
        <div className="align-center display-flex height-44">
          <div className="margin-left-14 width-180 align-center height-34 display-flex">
            { anonymous ? (
              <span className="font-family">Anonimo</span>
            ):(
              <span onClick={(e) => {window.location.href = "/MyPooling-FE/profile/"+creator.username; }} className="hover font-weight-500 font-family">@{creator.username}</span>
            )}
            <Rating className="margin-bottom-4 margin-left-8" readOnly onChange={(e) => e.preventDefault()} name="size-small" defaultValue={stars} size="small" />
          </div>
        </div>
        <div className="align-center display-flex min-height-50 height-auto">
          <div className="margin-left-14">
            {
              thought == null ? (
                <span className="font-family">Non è stato lasciato alcun commento</span>
              ):(
                <span className="font-family">{thought}</span>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}