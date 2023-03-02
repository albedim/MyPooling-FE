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
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import { BASE_URL } from '../../../config.ts'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";
import Avatar from "boring-avatars";


export const AddTrip = () => {

  const [tripData, setTripData] = useState({
    'departure_date': "",
    'departure_time': "",
    'mode': "",
    'slots': 0
  })

  const navigate = useNavigate()

  const [createdTripId, setCreatedTripId] = useState(0)

  const [places, setPlaces] = useState([])

  const [mode, setMode] = useState('trip')

  const [steps, setSteps] = useState([])

  const [stepTime, setStepTime] = useState("07:00")


  const handleTripData = (e) => {
    const newTripData = { ...tripData };
    newTripData[e.target.name] = e.target.value;
    setTripData(newTripData);
  }

  const handleSteps = (object) => {
    const newSteps = steps;
    newSteps.push(object);
    setSteps(newSteps)
  }

  const create = async (e) => {
    await axios.post(BASE_URL + '/trip/add', {
      'departure_date': tripData.departure_date.replaceAll("-", ",") + "," + tripData.departure_time.replace(":", ","),
      'owner_id': jwt(window.localStorage.getItem('token')).sub.user_id,
      'slots': parseInt(tripData.slots),
      'mode': tripData.mode
    })
      .then(response => {
        setCreatedTripId(response.data.param)
        setMode('steps')
      })
      .catch(error => console.log(error))
  }

  const addSteps = async () => {
    await axios.post(BASE_URL + '/step/add/' + createdTripId, steps)
      .then(response => {
        window.location.href = '/MyPooling-FE/profile/' + jwt(window.localStorage.getItem('token')).sub.username
      })
      .catch(error => console.log(error))
  }

  const validateToken = () => {
    if (window.localStorage.getItem('token') == null) {
      navigate("/signin")
    } else {
      axios.get(BASE_URL + '/user/session_check?jwt=' + window.localStorage.getItem('token'))
        .then(response => {

        })
        .catch(error => {
          window.localStorage.removeItem("token")
          navigate("/signin")
        })
    }
  }

  useEffect(() => {
    validateToken()
  }, [])


  const getPlaces = async (place) => {
    await axios.get("https://nominatim.openstreetmap.org/search?q=" + place + "&format=json&addressdetails=addressdetails")
      .then(response => {
        console.log(response.data)
        setPlaces(response.data);
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      {
        mode == 'trip' ? (
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small className="font-size-16">OFFRI UN PASSAGGIO</small>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input name='departure_date' value={tripData.departure_date} onChange={(e) => handleTripData(e)} placeholder="Data di partenza" type="date" />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input name='departure_time' value={tripData.departure_time} onChange={(e) => handleTripData(e)} placeholder="Orario di partenza" type="time" />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input name='mode' value={tripData.mode} onChange={(e) => handleTripData(e)} placeholder="Diretto verso" type="string" />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input name='slots' value={tripData.slots} onChange={(e) => handleTripData(e)} placeholder="Posti disponibili" type="number" />
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
                          {
                            tripData.departure_date == "" || tripData.departure_time == "" || tripData.slots == 0 ? (
                              <Button
                                className="opacity-40 white-color blue-backgroundcolor my-4"
                                color=""
                                type="button"
                              >
                                CREA
                              </Button>
                            ) : (
                              <Button
                                onClick={(e) => create(e)}
                                className="white-color blue-backgroundcolor my-4"
                                color=""
                                type="button"
                              >
                                CREA
                              </Button>
                            )
                          }
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        ) : (
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small className="font-size-16">CREA IL TUO ITINERARIO</small>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input value={stepTime} onChange={(e) => setStepTime(e.target.value)} placeholder="Orario" type="time" />
                        </InputGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input id="place" name='mode' onChange={(e) => getPlaces(e.target.value)} placeholder="Nome del posto" type="string" />
                        </InputGroup>
                        <div className="overflow-y-scroll max-height-480 white-backgroundcolor">
                          {
                            places.map(place => (
                              <div onClick={(e) => {
                                  handleSteps({ 'name': place.display_name, 'time': stepTime, 'place_id': place.place_id, 'x': parseFloat(place.lat), 'y': parseFloat(place.lon) }); 
                                  document.querySelector('#place').value = ""; 
                                  setPlaces([])
                                }} className="hover align-center height-84 display-flex">
                                <div className="align-center display-flex height-54">
                                  <div>
                                    <div className="margin-left-14 font-size-16 font-family">{place.display_name.substring(0, 34) + "..."}</div>
                                    <div className="margin-left-14 font-weight-500 gray-color font-size-16 font-family">{place.address.state == null ? place.address.country : place.address.state + ", " + place.address.country}</div>
                                  </div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </Form>
                      <div className="margin-top-54 overflow-y-scroll max-height-480">
                        <div>
                          <span className="font-size-16 font-family">Punti da aggiungere</span>
                        </div>
                        {
                          steps.map(step => (
                            <div className="white-backgroundcolor margin-top-14 box-shadow color border-radius-5 hover align-center height-64 display-flex">
                              <div className="align-center display-flex height-54">
                                  <div>
                                    <div className="margin-left-14 font-size-16 font-family">{step.name.substring(0, 34) + "..."}</div>
                                    <div className="gray-color margin-left-14 font-size-16 font-family">{step.time}</div>
                                  </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                      <div className="text-center">
                        {
                          steps.length == 0 ? (
                            <Button
                              className="opacity-40 white-color blue-backgroundcolor my-4"
                              color=""
                              type="button"
                            >
                              CREA
                            </Button>
                          ) : (
                            <Button
                              onClick={(e) => addSteps()}
                              className="white-color blue-backgroundcolor my-4"
                              color=""
                              type="button"
                            >
                              CREA
                            </Button>
                          )
                        }
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        )
      }
    </>
  );
}
