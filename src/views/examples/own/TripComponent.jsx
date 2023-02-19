import axios from "axios";
import { useEffect, useState } from "react";

export const TripComponent = ({trip_id, step_id, username, creation_date, used_slots, slots, code}) => {

  const [date, setDate] = useState("");

  const [openAlert, setOpenAlert] = useState(false);

  const [messageAlert, setMessageAlert] = useState("");

  const [typeAlert, setTypeAlert] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const fixDate = () => {
    const date = new Date();
    const creationDate = new Date(creation_date.substring(0,10));
    console.log(date.getDay())
    if(date.getFullYear() == creationDate.getFullYear())
      if(date.getUTCMonth() == creationDate.getMonth())
        if(date.getDay == creationDate.getDay())
          setDate("Creato oggi")
        else if(date.getDay == creationDate.getDay() + 1)
          setDate("Creato ieri")
        else if(date.getDay == creationDate.getDay() + 2)
          setDate("Creato due giorni fa")
        else setDate("Creato il " + creationDate.getDay() + "-" + creationDate.getMonth())
      else setDate("Creato il " + creationDate.getDay() + "-" + creationDate.getMonth())
    else setDate("Creato " + date.getFullYear() - creationDate.getFullYear() + " anni fa" )
  }

  useEffect(() => {
    fixDate();
  },[])

  const addRide = async () => {
    await axios.post("http://albedim.pythonanywhere.com/api/v_1_4_0/ride/add", {
      'user_id': 1,
      'step_id': step_id,
      'trip_id': trip_id
    })
    .then((response) => {
      setOpenAlert(true);
      setMessageAlert("Partecipazione aggiunta con successo");
      setTypeAlert("success")
    })
    .catch(error => {
      if(error.response.data.code == 409){
        setOpenAlert(true);
        setMessageAlert("Sei già un partecipante a questo itinerario");
        setTypeAlert("error");
      }else if(error.response.data.code == 412){
        setOpenAlert(true);
        setMessageAlert("Non ci sono posti liberi per questo itinerario");
        setTypeAlert("error");
      }
    });
  }

  return(
    <div className="box-shadow white-backgroundcolor border-radius-5 margin-left-40 height-240 width-340">
      <div className="display-flex space-between align-center height-74">
        <div className="width-140"><h2 className="margin-top-24 font-size-20 margin-left-34 blue-color font-family">#{code}</h2></div>
        <div className="space-around align-center display-flex display-flex height-54 width-110">
          {used_slots < slots ? (
            <div className="display-flex width-38 display-flex">
              <span className="font-weight-500 font-family font-size-14">{used_slots}/{slots}</span>
              <div className="margin-left-8 border-radius-circle height-8 width-8 green-backgroundcolor"></div>
            </div>
          ):(
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
          <div className="display-flex align-center height-34 width-140"><h2 className="font-size-18 margin-left-40 font-family">@{username}</h2></div>
          <div className="align-center display-flex height-24 width-140"><h4 className="font-size-14 font-weight-400 margin-left-40 gray-color font-family">{date}</h4></div>
        </div>
        <div className="display-flex width-160">
          <button onClick={(e) => addRide()} className="transition button hover font-family blue-color border-smaller outline-none blue-border border-radius-5 white-backgroundcolor margin-left-14 margin-top-14 height-38 width-114">PARTECIPA</button>
        </div>
      </div>
    </div>
  );

}