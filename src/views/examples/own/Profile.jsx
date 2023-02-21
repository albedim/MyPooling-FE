/*!

=========================================================
* Argon Design System React - v1.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";
import { BASE_URL } from '../../../config.ts'

// core components
import { DemoNavbar } from "../../../components/Navbars/DemoNavbar";
import SimpleFooter from "../../../components/Footers/SimpleFooter";
import Avatar from "boring-avatars";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QontoConnector from './QontoConnector'
import jwt from "jwt-decode";
import { Menu, Step, StepButton, StepContent, StepIcon, StepLabel, Stepper, StepperContext, tabClasses } from "@mui/material";
import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { TripComponent } from "./TripComponent";
import { Feedback } from "./Feedback";
import { OwnTrip } from "./OwnTrip";
import { RidingTrip } from "./RidingTrip";
import TabsVariants from "./TabsVariants";

export const Profile = () => {

  const username = useParams().username;

  const [index, setIndex] = useState('feedbacks')

  const [ridingTrips, setRidingTrips] = useState([])

  const [feedbacks, setFeedbacks] = useState([])

  const [ownTrips, setOwnTrips] = useState([])

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)

  const [user, setUser] = useState({});


  const getUserInformation = async () => {
    await axios.get(BASE_URL + '/user/get?username='+ username)
    .then(response => {
      setUser(response.data)
      getOwnTrips(response.data.user_id)
    })
    .catch(error => navigate("/page-not-found"))
  }

  const getOwnTrips = async (user_id) => {
    await axios.get(BASE_URL + '/trip/get/own/'+ user_id)
    .then(response => {
      setOwnTrips(response.data)
      getFeedbacks(user_id)
    })
    .catch(error => console.log(error))
  }

    const getRidingTrips = async (user_id) => {
    await axios.get(BASE_URL + '/trip/get/riding/'+ user_id)
    .then(response => {
      setRidingTrips(response.data)
      setIsLoading(false)
    })
    .catch(error => console.log(error))
  }

  const getFeedbacks = async (user_id) => {
    await axios.get(BASE_URL + '/feedback/get/'+ user_id)
    .then(response => {
      setFeedbacks(response.data)
      getRidingTrips(user_id)
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    getUserInformation()
  },[])

  
  // Token validation
  
  useEffect(() => {
    if(window.localStorage.getItem('token') == null){
      navigate("/signin")
    }else{
      axios.get(BASE_URL + '/user/session_check?jwt='+window.localStorage.getItem('token'))
      .then(response => {
        
      })
      .catch(error => {
        navigate("/signin")
      })
    }
  },[])

  return (
    <>
      <DemoNavbar />
      <div className="profile-page">
        <section className="section-profile-cover section-shaped my-0">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* SVG separator */}
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
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("../../../assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      <Button
                        className="white-color blue-backgroundcolor mr-4"
                        color=""
                        onClick={(e) => e.preventDefault()}
                        size="md"
                      >
                        Valuta
                      </Button>
                      {
                        user.user_id == jwt(window.localStorage.getItem('token')).sub.user_id &&

                        <Button
                        className="border-smaller blue-color ok-backgroundcolor float-right"
                        color=""
                        onClick={(e) => e.preventDefault()}
                        size="md"
                        >
                        Modifica
                        </Button>
                      }
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    {
                      isLoading ? (
                        <h2>dsfgadsg</h2>
                      ):(
                        <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">
                          {
                            user.average_stars >= 0 && user.average_stars <= 1 &&
                              <span className="red-color">PESSIMA</span>
                          }
                          {
                            user.average_stars >= 2 && user.average_stars < 3 &&
                              <span className="yellow-color">MEDIOCRE</span>
                          }
                          {
                            user.average_stars >= 3 && user.average_stars < 4 &&
                              <span className="yellow-green-color">BUONA</span>
                          }
                          {
                            user.average_stars >= 4 &&
                              <span className="green-color">OTTIMA</span>
                          }
                        </span>
                        <span className="description">Valutazione</span>
                      </div>
                      <div>
                        <span className="heading">{user.more_information.own_trips}</span>
                        <div><span className="description">Offerti</span></div>
                      </div>
                      <div>
                        <span className="heading">{user.more_information.riding_trips}</span>
                        <span className="description">Ricevuti</span>
                      </div>
                    </div>
                      )
                    }
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>
                    {user.name}{" "}
                    <span className="font-weight-light">, {user.age}</span>
                  </h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {user.place}
                  </div>
                  <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {user.bio != "" ? user.bio : "No bio."}
                  </div>
                </div>
                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="9">
                    <Tabs value={index} onChange={(event, value) => setIndex(value)} aria-label="Basic tabs" defaultValue={1} sx={{ borderRadius: 'lg' }}>
                      <div className="height-80">
                        <TabList className="box-shadow" variant="plain" color="primary">
                          {
                            index == 'feedbacks' ? (
                              <Tab className="outline-none-i border-none-i white-color blue-backgroundcolor" color="primary" value={'feedbacks'}><span className="font-family">Valutazione</span></Tab>
                            ):(
                              <Tab color="primary" value={'feedbacks'}><span className="font-family">Valutazione</span></Tab>
                            )
                          }
                          {
                            index == 'ownTrips' ? (
                              <Tab className="outline-none-i white-color blue-backgroundcolor" sx={{backgroundColor: 'blue'}} color="primary" value={'ownTrips'}><span className="font-family">Passaggi dati</span></Tab>
                            ):(
                              <Tab color="primary" value={'ownTrips'}><span className="font-family">Passaggi dati</span></Tab>
                            )
                          }
                          {
                            index == 'ridingTrips' ? (
                              <Tab className="outline-none-i white-color blue-backgroundcolor" sx={{backgroundColor: 'blue'}} color="primary" value={'ridingTrips'}><span className="font-family">Passaggi ricevuti</span></Tab>
                            ):(
                              <Tab color="primary" value={'ridingTrips'}><span className="font-family">Passaggi ricevuti</span></Tab>
                            )
                          }
                        </TabList>
                      </div>
                      <div className="overflow-x-hidden overflow-y-scroll max-height-740 ">
                        <TabPanel value={'feedbacks'} sx={{ p: 2 }}>
                          <div className="space-around display-flex">
                            <div>
                              {
                                feedbacks.map(feedback => (
                                  <Feedback anonymous={feedback.anonymous} thought={feedback.thought} stars={feedback.stars} creator={feedback.creator} />
                                ))
                              }
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel value={'ownTrips'} sx={{ p: 2 }}>
                          <div>
                            {
                              ownTrips.map(ownTrip => (
                                <OwnTrip code={ownTrip.code} departure_date={ownTrip.departure_date} slots={ownTrip.slots} mode={ownTrip.mode} steps={ownTrip.steps}/>
                              ))
                            }
                          </div>
                        </TabPanel>
                        <TabPanel value={'ridingTrips'} sx={{ p: 2 }}>
                          <div>
                            {
                              ridingTrips.map(ridingTrip => (
                                <RidingTrip code={ridingTrip.code} creator={ridingTrip.owner.username} departure_date={ridingTrip.departure_date} slots={ridingTrip.slots} mode={ridingTrip.mode} steps={ridingTrip.steps}/>
                              ))
                            }
                          </div>
                        </TabPanel>
                      </div>
                    </Tabs>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </div>
      <SimpleFooter />
    </>
  );
  }
