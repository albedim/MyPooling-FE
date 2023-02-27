import axios from "axios";
import jwt from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config.ts";


export const TripComponent = ({ owner_username, trip_id, step_id, username, departure_date, used_slots, slots, code }) => {

  const [date, setDate] = useState("");

  const navigate = useNavigate()

  const [openAlert, setOpenAlert] = useState(false);

  const [messageAlert, setMessageAlert] = useState("");

  const [typeAlert, setTypeAlert] = useState("");


  const addRide = async () => {
    await axios.post(BASE_URL + "/ride/add", {
      'user_id': jwt(window.localStorage.getItem('token')).sub.user_id,
      'step_id': step_id,
      'trip_id': trip_id
    })
      .then((response) => {
        setOpenAlert(true);
        setMessageAlert("Partecipazione aggiunta con successo");
        setTypeAlert("success")
      })
      .catch(error => {
        if (error.response.data.code == 409) {
          setOpenAlert(true);
          setMessageAlert("Sei già un partecipante a questo itinerario");
          setTypeAlert("error");
        } else if (error.response.data.code == 412) {
          setOpenAlert(true);
          setMessageAlert("Non ci sono posti liberi per questo itinerario");
          setTypeAlert("error");
        }
      });
  }

  return (
       <div className="box-shadow white-backgroundcolor border-radius-5 margin-left-40 height-240 width-340">
      <div className="display-flex space-between align-center height-74">
        <div className="width-140"><h2 className="font-weight-600 margin-top-24 font-size-20 margin-left-34 blue-color font-family">#{code}</h2></div>
        <div className="space-around align-center display-flex display-flex height-54 width-110">
          {used_slots < slots ? (
            <div className="display-flex width-38 display-flex">
              <span className="font-weight-500 font-family font-size-14">{used_slots}/{slots}</span>
              <div className="margin-left-8 border-radius-circle height-8 width-8 green-backgroundcolor"></div>
            </div>
          ) : (
            <div className="display-flex width-38 display-flex">
              <span className="font-weight-500 font-family font-size-14">{used_slots}/{slots}</span>
              <div className="margin-left-8 border-radius-circle height-8 width-8 red-backgroundcolor"></div>
            </div>
          )
          }
        </div>
      </div>
      <div className="height-80">

      </div>
      <div className="space-between display-flex height-80">
        <div className="">
          <div className="display-flex align-center height-34 width-140"><h2 onClick={(e) => navigate("/profile/" + owner_username)} className="font-weight-500 font-size-18 margin-left-40 font-family">@{username}</h2></div>
          <div className="align-center display-flex height-24 width-140"><h4 className="font-size-14 font-weight-400 margin-left-40 gray-color font-family">{departure_date.substring(0,10).split("-")[2] + "/" + departure_date.substring(0,10).split("-")[1] + "/" + departure_date.substring(0,10).split("-")[0].substring(2,4) + ", " + departure_date.substring(11, 16)}</h4></div>
        </div>
        <div className="display-flex width-160">
          <button onClick={(e) => addRide()} className="hover font-family blue-color border-smaller outline-none blue-border border-radius-5 white-backgroundcolor margin-left-14 margin-top-14 height-38 width-114">PARTECIPA</button>
        </div>
      </div>
    </div>
  );

}