import axios from "axios";
import { useState } from "react";
import { IonIcon } from "react-ion-icon";
import { SpinnerCircular } from "spinners-react";
import { Place } from "./Place";
import { BASE_URL, ISTITUTE_NAME } from '../../../config.ts'
import { TripComponent } from "./TripComponent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DemoNavbar } from "../../../components/Navbars/DemoNavbar";
import { Container, Row } from "reactstrap";


export const SearchSchool = () => {

  const [place, setPlace] = useState("");

  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);

  const [hasSelected, setHasSelected] = useState(false);

  const [places, setPlaces] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const getTomorrow = () => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toJSON().slice(0, 10);
  }

  const [request, setRequest] = useState({
    'x': 0,
    'y': 0,
    'strength': 1,
    'departure_date': getTomorrow()
  })

  const handleRequest = (e) => {
    const newRequest = { ...request }
    newRequest[e.target.name] = e.target.value;
    setRequest(newRequest);
  }

  const getPlaces = async () => {
    setIsLoading(true);
    await axios.get("https://nominatim.openstreetmap.org/search?" + new URLSearchParams({
      'q': place,
      'format': "json",
      'addressdetails': "addressdetails",
    }).toString())
    .then(response => {
      console.log(response.data)
      setPlaces(response.data);
    })
    .catch(error => console.log(error));
    setIsLoading(false);
  }

  const getTrips = async (place) => {
    setHasSelected(true);
    setIsLoading(true);
    console.log(place.lat, place.lon)
    await axios.get(BASE_URL + `/trip/get/near?x=${parseFloat(place.lat)}&y=${parseFloat(place.lon)}&strength=${request.strength}&departure_date=${request.departure_date.replaceAll("-",",")}&mode=school`)
    .then(response => {
      setTrips(response.data);
    })
    .catch(error => console.log(error));
    setIsLoading(false);
  }

  // Token validation
  
  useEffect(() => {
    if(window.localStorage.getItem('token') == null){
      navigate("/signin")
    }else{
      axios.get(BASE_URL + '/user/session_check?jwt='+window.localStorage.getItem('token'))
      .then(response => {
        
      })
      .catch(error => {
        window.localStorage.removeItem("token")
        navigate("/signin")
      })
    }
  },[])

  return(
    <div className="width-full height-full">
      <DemoNavbar/>
      <section className="height-540 section section-lg section-shaped pb-250">
        <div className="shape shape-style-1 shape-default">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <Container className="py-lg-md d-flex">
          <div className="col px-0">
            <Row>
              <div className="width-full">
                <div className="margin-top-124 height-280 display-flex space-around align-center">
                  <div className="box-shadow-clearer white-backgroundcolor display-flex border-radius-5 height-90 width-780">
                    <div className="border-color-gray border-right-smaller height-90 width-240">
                      <div className="display-flex align-center height-44">
                        <span className="gray-color font-weight-500 font-size-11 font-family margin-left-14">PARTENZA</span>
                      </div>
                      <div className="height-34 display-flex align-center">
                        <input value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Cerca" className="placeholder margin-left-14 border-none outline-none height-24 width-168" type="text" />
                        {
                          place != "" ? (
                            <span onClick={(e) => setPlace("")} className="hover margin-left-14 font-size-18"><IonIcon name="close"/></span>
                          ):(
                            <span className="opacity-40 margin-left-14 font-size-18"><IonIcon name="close"/></span>
                          )
                        }
                      </div>
                    </div>
                    <div className="border-color-gray border-right-smaller width-180">
                      <div className="display-flex align-center height-44">
                        <span className="gray-color font-weight-500 font-size-11 font-family margin-left-14">DESTINAZIONE</span>
                      </div>
                      <div className="height-34 display-flex align-center">
                        <h2 className="font-weight-400 font-size-16 font-family margin-left-14">{ISTITUTE_NAME}</h2>
                      </div>
                    </div>
                    <div className="border-color-gray border-right-smaller width-180">
                      <div className="display-flex align-center height-44">
                        <span className="gray-color font-weight-500 font-size-11 font-family margin-left-14">PARTENZA IL</span>
                      </div>
                      <div className="height-24 display-flex space-around align-center">
                        <input name="departure_date" onChange={(e) => handleRequest(e)} value={request.departure_date} className="border-none outline-none height-34 width-140" type="date" />
                      </div>
                    </div>
                    <div className="border-color-gray border-right-smaller width-114">
                      <div className="display-flex align-center height-44">
                        <span className="gray-color font-weight-500 font-size-11 font-family margin-left-14">VICINANZA</span>
                      </div>
                      <div className="display-flex space-around align-center height-24">
                        <select name="strength" onChange={(e) => handleRequest(e)} value={request.strength} className="placeholder border-none width-98 height-44">
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                        </select>
                      </div>
                    </div>
                    <div className="blue-color display-flex space-around align-center height-90 width-100">
                      {
                        place != "" ? (
                          <button onClick={(e) => {
                            getPlaces()
                            setHasSelected(false)
                          }} className="outline-none hover height-34 font-size-14 align-center display-flex space-around border-radius-5 border-none font-family white-color width-64 blue-backgroundcolor">CERCA</button>
                        ):(
                          <button className="outline-none opacity-40 height-34 font-size-14 align-center display-flex space-around border-radius-5 border-none font-family white-color width-64 blue-backgroundcolor">CERCA</button>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </Container>
        <div className="separator separator-bottom separator-skew">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="fill-white"
              points="2560 0 2560 100 0 100"
            />
          </svg>
        </div>
      </section>
      <div className="height-540">
          <div className="display-flex space-around align-center height-80">
            <h2 className="font-weight-500 font-size-24 font-family">La tua ricerca</h2>
          </div>
          <div className="display-flex space-around height-380">
            {
              isLoading ? (
                <SpinnerCircular size={60} color='#589df8' thickness={140} secondaryColor={'#f8f8f8'} />
              ):(
                !hasSelected ? (
                  <div className="display-flex align-center overflow-x-scroll width-almost-full">
                    {
                      places.map((place) => (
                        <div onClick={(e) => getTrips(place)}><Place name={place.display_name} state={place.address.state} country={place.address.country}/></div>
                      ))
                    }
                  </div>
                ):(
                  <div className="display-flex align-center overflow-x-scroll width-almost-full">
                  {
                      trips.map((trip) => (
                        <TripComponent owner_usernam={trip.owner.user_id} step_id={trip.step.step_id} trip_id={trip.trip_id} username={trip.owner.username} creation_date={trip.creation_date} used_slots={trip.used_slots} slots={trip.slots} code={trip.code}/>
                      ))
                  }
                </div>
                )
              )
            }
          </div>
      </div>
    </div>
  );

}