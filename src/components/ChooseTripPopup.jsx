import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

export const ChooseTripPopup = () => {
  
  const navigate = useNavigate()

  return(
    <div className="opacity-background z-index-2 align-center space-around height-full display-flex position-absolute width-full">
      <div className="space-around z-index-3 align-center display-flex border-radius-10 white-backgroundcolor height-340 width-340">
        <div>
          <div className='space-around display-flex width-434'>
            <button onClick={(e) => navigate("/go_to_school")} className='hover z-index-1 font-size-16 font-family border-radius-5 border-none white-color blue-backgroundcolor height-70 width-240'>Vai a scuola</button>
          </div>
          <div className='margin-top-40 space-around display-flex width-434'>
            <button onClick={(e) => navigate("/go_home")} className='ok-backgroundcolor hover border-smaller z-index-1 border-blue blue-color font-size-16 font-family border-radius-5 height-70 width-240'>Torna a casa</button>
          </div>
        </div>
      </div>
    </div>
  );
}