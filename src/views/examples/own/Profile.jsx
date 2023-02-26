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
import { Button, Card, Container, Row, Col, Modal, CardHeader, CardBody, FormGroup, InputGroupAddon, InputGroupText, InputGroup, Input, Form } from "reactstrap";
import { BASE_URL } from '../../../config.ts'

// core components
import { DemoNavbar } from "../../../components/Navbars/DemoNavbar";
import { Rating, Stack, TextareaAutosize } from "@mui/material";
import SimpleFooter from "../../../components/Footers/SimpleFooter";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";
import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { Feedback } from "./Feedback";
import { OwnTrip } from "./OwnTrip";
import { RidingTrip } from "./RidingTrip";
import { Loading } from "./Loading";
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
import { NotFound } from "./NotFound";

export const Profile = () => {

  const username = useParams().username;

  const [feedbackModalStatus, setFeedbackModalStatus] = useState(false)

  const [accountModalStatus, setAccountModalStatus] = useState(false)

  const [index, setIndex] = useState('feedbacks')

  const [ridingTrips, setRidingTrips] = useState([])

  const [feedbacks, setFeedbacks] = useState([])

  const [ownTrips, setOwnTrips] = useState([])

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)

  const [user, setUser] = useState({});

  const [feedbackAnonymous, setFeedbackAnonymous] = useState(false)

  const [feedbackBody] = useState({
    'thought': null,
    'stars': 0
  })


  const getUserInformation = async () => {
    await axios.get(BASE_URL + '/user/get?username='+ username)
    .then(response => {
      setUser(response.data)
      getOwnTrips(response.data.user_id)
    })
    .catch(error => navigate("/page-not-found"))
  }

  const addFeedback = async () => {
    await axios.post(BASE_URL + '/feedback/add', {
      'creator_id': jwt(window.localStorage.getItem('token')).sub.user_id,
      'receiver_id': user.user_id,
      'stars': feedbackBody.stars,
      'anonymous': feedbackAnonymous,
      'thought': feedbackBody.thought
    })
    .then(response => {
      getFeedbacks(user.user_id)
      getUserInformation()
      console.log(response.data)
    })
    .catch(error => console.log(error))
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

  const changeUserData = async () => {
    await axios.put(BASE_URL + '/user/change', user)
    .then(response => {
      
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
        window.localStorage.removeItem("token")
        navigate("/signin")
      })
    }
  },[])

  const handleAccountData = (e) => {
    const newAccountData = {...user};
    newAccountData[e.target.name] = e.target.value;
    setUser(newAccountData)
  }

  return (
    <>
    {
      isLoading ? (
        <Loading visible={true}/>
      ):(
        <>
          <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={accountModalStatus}
            toggle={() => accountModalStatus}
          >
            <div className="modal-header">
              <span className="font-size-18 font-family">Modifica i tuoi dati</span>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => setAccountModalStatus(false)}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body p-0">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="name" value={user.name} onChange={(e) => handleAccountData(e)} placeholder="Name" type="text" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="age" value={user.age} onChange={(e) => handleAccountData(e)} placeholder="Anni" type="number" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="bio" value={user.bio} onChange={(e) => handleAccountData(e)} placeholder="Dicci di più su di te" type="text" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="place" value={user.place} onChange={(e) => handleAccountData(e)} placeholder="Dove abiti?" type="text" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="email" value={user.email} onChange={(e) => handleAccountData(e)} placeholder="Email" type="email" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="password" value={user.password} onChange={(e) => handleAccountData(e)}
                          placeholder="Password"
                          type="password"
                          autoComplete="off"
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                    </div>
                    <div className="text-center">
                      <Button onClick={(e) => {changeUserData(); setAccountModalStatus(false)}} className="border-none white-color blue-backgroundcolor my-4" color="" type="button">
                        CAMBIA
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Modal>
          <>
          <Modal
              className="modal-dialog-centered"
              isOpen={feedbackModalStatus}
              toggle={() => feedbackModalStatus}
          >
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title-default">
                Lascia un feedback a {user.name}
              </h6>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => setFeedbackModalStatus(false)}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="height-14 space-around align-center space-around display-flex">
                <div className="width-254 align-center display-flex">
                  <div><span className="gray-color font-size-14 font-family">Valutazione</span></div>
                  <div className="margin-left-14 "><Rating name="size-large" size="large" onChange={(e) => feedbackBody.stars = e.target._wrapperState.initialValue} defaultValue={0} /></div>
                </div>
              </div>
              <div className="height-54 space-around align-center display-flex">
                <div className="width-254 align-center display-flex">
                  <div><span className="gray-color font-size-14 font-family">Anonimo</span></div>
                  <div className="margin-left-14"><SwitchUnstyled className="height-24 width-24" checked={feedbackAnonymous} onChange={(e) => setFeedbackAnonymous(!feedbackAnonymous)}></SwitchUnstyled></div>
                </div>
              </div>
              <div className="space-around display-flex">
                <input placeholder="Scrivi una recensione (Opzionale)" className="border-radius-5 height-28 font-size-14 outline-none border-smaller gray-border width-254" type="text" />
              </div>
            </div>
            <div className="modal-footer">
              <Button className="white-color blue-backgroundcolor" onClick={(e) => {addFeedback(); setFeedbackModalStatus(false)}} color="" type="button">
                Aggiungi
              </Button>
              <Button
                className="blue-color border-blue ml-auto"
                color=""
                data-dismiss="modal"
                type="button"
                onClick={() => setFeedbackModalStatus(false)}
              >
                Chiudi
              </Button>
            </div>
          </Modal>
        </>
        <DemoNavbar/>
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
                          {
                            user.user_id == jwt(window.localStorage.getItem('token')).sub.user_id ? (
                              <Button
                                className="font-family white-color blue-backgroundcolor float-right"
                                color=""
                                onClick={(e) => setAccountModalStatus(true)}
                                size="md"
                              >
                                Modifica
                              </Button>
                            ):(
                              <Button
                                className="border-none white-color blue-backgroundcolor mr-4"
                                color=""
                                onClick={(e) => setFeedbackModalStatus(true)}
                                size="md"
                              >
                                Valuta
                              </Button>
                            )
                          }
                        </div>
                      </Col>
                      <Col className="order-lg-1" lg="4">
                        <div className="card-profile-stats d-flex justify-content-center">
                          <div>
                            <span className="heading">
                              {
                                feedbacks.length == 0 ? (
                                  <span>NaN</span>
                                ):(
                                  user.average_stars >= 0 && user.average_stars <= 1 ? (
                                    <span className="red-color">PESSIMA</span>
                                  ):(
                                    user.average_stars >= 2 && user.average_stars < 3 ? (
                                      <span className="yellow-color">MEDIOCRE</span>
                                    ):(
                                      user.average_stars >= 3 && user.average_stars < 4 ? (
                                        <span className="yellow-green-color">BUONA</span>
                                      ):(
                                        user.average_stars >= 4 &&
                                          <span className="green-color">OTTIMA</span>
                                      )
                                    )
                                  )
                                )
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
                                  feedbacks.length == 0 ? (
                                    <NotFound page={false}/>
                                  ):(
                                    feedbacks.map(feedback => (
                                      <Feedback anonymous={feedback.anonymous} thought={feedback.thought} stars={feedback.stars} creator={feedback.creator} />
                                    ))
                                  )
                                }
                                </div>
                              </div>
                            </TabPanel>
                            <TabPanel value={'ownTrips'} sx={{ p: 2 }}>
                              <div>
                                {
                                  ownTrips.length == 0 ? (
                                    <NotFound page={false}/>
                                  ):(
                                    ownTrips.map(ownTrip => (
                                      <OwnTrip ownerId={ownTrip.owner_id} tripId={ownTrip.trip_id} code={ownTrip.code} departure_date={ownTrip.departure_date} slots={ownTrip.slots} mode={ownTrip.mode} steps={ownTrip.steps}/>
                                    ))
                                  )
                                }
                              </div>
                            </TabPanel>
                            <TabPanel value={'ridingTrips'} sx={{ p: 2 }}>
                              <div>
                                {
                                  ridingTrips.length == 0 ? (
                                    <NotFound page={false}/>
                                  ):(
                                    ridingTrips.map(ridingTrip => (
                                      <RidingTrip code={ridingTrip.code} creator={ridingTrip.owner.username} departure_date={ridingTrip.departure_date} slots={ridingTrip.slots} mode={ridingTrip.mode} steps={ridingTrip.steps}/>
                                    ))
                                  )
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
          <SimpleFooter/>
        </>
      )
    }
    </>
  );
}
