import { Step, StepLabel, Stepper } from "@mui/material";
import QontoConnector from './QontoConnector'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QontoStepIcon } from "./QontoStepicon";
import { ISTITUTE_NAME } from "../../../config.ts";

export const OwnTrip = ({code, departure_date, mode, slots, steps}) => {

  const [departureDate, setDepartureDate] = useState("")

  const fixDepartureDate = () => {
    setDepartureDate(departure_date.substring(8,10) + '/' + departure_date.substring(5,7) + '/' + departure_date.substring(0,4))
  }

  useEffect(() => {
    fixDepartureDate()
  },[])

  return(
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
              <Step style={{color: 'red'}} key={step.step_id}>
                <StepLabel><span className="font-weight-500 font-family">{step.name}</span></StepLabel>
              </Step>
            ))
          }
        </Stepper>
        </div>
      </div>
    </div>
  );

}