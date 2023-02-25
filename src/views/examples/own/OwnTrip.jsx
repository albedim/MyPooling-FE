import { Step, StepLabel, Stepper } from "@mui/material";
import QontoConnector from './QontoConnector'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QontoStepIcon } from "./QontoStepicon";
import { ISTITUTE_NAME } from "../../../config.ts";
import { Card, CardBody, CardHeader, Modal } from "reactstrap";
import Avatar from "boring-avatars";
import { BASE_URL } from "../../../config.ts";
import { NotFound } from "./NotFound";

export const OwnTrip = ({tripId, code, departure_date, mode, slots, steps}) => {

  const [departureDate, setDepartureDate] = useState("")

  const fixDepartureDate = () => {
    setDepartureDate(departure_date.substring(8,10) + '/' + departure_date.substring(5,7) + '/' + departure_date.substring(0,4))
  }

  const [rides, setRides] = useState([])

  const [ridesModalStatus, setRidesModalStatus] = useState(false)

  const getRides = async(trip_id, step_id) => {
    await axios.get(BASE_URL + '/ride/get?tripId=' + trip_id + "&stepId=" + step_id)
    .then(response => {
      setRides(response.data)
      console.log(rides)
    })
    .catch(error => console.log(error))
  }
  
  useEffect(() => {
    fixDepartureDate()
  },[])

  return(
    <>
      <Modal
        className="modal-dialog-centered"
        size="sm"
        isOpen={ridesModalStatus}
        toggle={() => ridesModalStatus}
      >
        <div className="modal-header">
          <span>Chi devi andare a prendere qui</span>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setRidesModalStatus(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              {
                rides.length == 0 ? (
                  <NotFound page={false}/>
                ):(
                  rides.map(ride => (
                    <div onClick={(e) => window.location.href = '/MyPooling-FE/profile/' + ride.user.username} className="hover align-center height-84 display-flex">
                      <div className="width-74 align-center space-around display-flex">
                        <div className="width-54">
                          <Avatar
                            size={"30px"}
                            name={ride.user.username}
                            variant="beam"
                            colors={["#87C7F6", "#50B5F6", "#42A6EE", "#5EB4F2", "#439FDF"]}
                          />
                        </div>
                      </div>
                      <div className="align-center display-flex height-54">
                        <div>
                          <div className="margin-left-14 font-size-16 font-family">{ride.user.name}</div>
                          <div className="margin-left-14 font-weight-500 gray-color font-size-16 font-family">@{ride.user.username}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )
              }
            </CardBody>
          </Card>
        </div>
      </Modal>
      <div className="align-center space-around display-flex height-380">
        <div className="height-340"> 
          <div className="box-shadow border-radius-5 height-240 width-340">
            <div className="display-flex space-between align-center height-74">
              <div className="display-flex align-center width-140"><span className="font-weight-600 font-size-20 margin-left-34 blue-color font-family">#{code}</span></div>
              <div className="space-around align-center display-flex display-flex width-114">
                <span className="gray-color font-weight-500 font-family font-size-17">{slots} POSTI</span>
              </div>
            </div>
            <div className="height-80">

            </div>
            <div className="space-between display-flex height-80">
              <div className="align-center width-164 space-around display-flex">
                <div className="width-98">
                  <div className="display-flex align-center height-34 width-140"><h2 className="font-weight-500 font-size-16 font-family">Creato da te</h2></div>
                  <div className="align-center display-flex height-24 width-140"><h4 className="font-size-14 font-weight-400 gray-color font-family">{departureDate}</h4></div>
                </div>
              </div>
              <div className="space-around align-center display-flex width-160">
                <div className="border-blue blue-color align-center space-around display-flex border-radius-5 height-34 width-124 border-smaller">
                  {
                    mode == 'home' ? (
                      <span className="font-family">CASA</span>
                    ):(
                      <span className="font-family">ISTITUTO</span>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="margin-top-24 width-340">
          <Stepper activeStep={steps.length + 1} alternativeLabel>
            {
              mode == 'home' ? (
                <Step style={{color: 'red'}} key={0}>
                  <StepLabel><span className="font-weight-600 font-family">CASA</span></StepLabel>
                </Step>
              ):(
                <Step style={{color: 'red'}} key={0}>
                  <StepLabel><span className="font-weight-600 font-family">{ISTITUTE_NAME.toUpperCase()}</span></StepLabel>
                </Step>
              )
            }
            {
              steps.map(step => (
                <Step
                  onClick={(e) => { 
                    getRides(tripId, step.step_id); 
                    setRidesModalStatus(true)
                  }} style={{cursor: 'pointer', color: 'red'}} key={step.step_id}>
                  <StepLabel><span className="font-weight-500 font-family">{step.name}</span></StepLabel>
                </Step>
              ))
            }
          </Stepper>
          </div>
        </div>
      </div>
    </>
  );

}