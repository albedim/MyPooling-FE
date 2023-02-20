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
import React, { useState } from "react";
import { BASE_URL } from '../../../config.ts'
import { useNavigate } from "react-router-dom";

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
import axios from "axios";
import SimpleFooter from "../../../components/Footers/SimpleFooter";
import { Alert, Snackbar } from "@mui/material";

export const Signup = () => {

  const [signupData, setSignupData] = useState({
    'email': "",
    'age': 0,
    'bio': null,
    'place': "",
    'name': "",
    'username': "",
    'password': ""
  })

  const [isLoading, setIsLoading] = useState(false)

  const [openAlert, setOpenAlert] = useState(false)

  const [messageAlert, setMessageAlert] = useState("")

  const [typeAlert, setTypeAlert] = useState("");

  const navigate = useNavigate()

  const handleSignupnData = (e) => {
    const newSignupData = {...signupData};
    newSignupData[e.target.name] = e.target.value;
    setSignupData(newSignupData);
  }

  const signup = async (e) => {
    setIsLoading(true);
    await axios.post(BASE_URL + '/user/signup', signupData)
    .then(response => {
      setOpenAlert(true)
      setMessageAlert("Account creato con successo")
      setTypeAlert("success")
      setTimeout(() => {
        setIsLoading(false)
        navigate("/signin")
      }, 2400);
    })
    .catch(error => {
      setOpenAlert(true);
      setMessageAlert("Esiste già un account con queste credeziali")
      setTypeAlert("error")
      setIsLoading(false)
      console.log(error)
    })
  }
  
  return(
    <>
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
                      <small>Sign up with</small>
                    </div>
                    <div className="text-center">
                      <Button
                        className="btn-neutral btn-icon mr-4"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src="assets/img/icons/common/github.svg"
                          />
                        </span>
                        <span className="btn-inner--text">Github</span>
                      </Button>
                      <Button
                        className="btn-neutral btn-icon ml-1"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src="assets/img/icons/common/google.svg"
                          />
                        </span>
                        <span className="btn-inner--text">Google</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Or sign up with credentials</small>
                    </div>
                    <Form role="form">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-hat-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input name="name" value={signupData.name} onChange={(e) => handleSignupnData(e)} placeholder="Name" type="text" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-hat-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input name="username" value={signupData.username} onChange={(e) => handleSignupnData(e)} placeholder="Username" type="text" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-hat-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input name="age" value={signupData.age} onChange={(e) => handleSignupnData(e)} placeholder="Anni" type="number" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-hat-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input name="bio" value={signupData.bio} onChange={(e) => handleSignupnData(e)} placeholder="Dicci di più su di te" type="text" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-hat-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input name="place" value={signupData.place} onChange={(e) => handleSignupnData(e)} placeholder="Dove abiti?" type="text" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-hat-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input name="name" value={signupData.name} onChange={(e) => handleSignupnData(e)} placeholder="Name" type="text" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input name="email" value={signupData.email} onChange={(e) => handleSignupnData(e)} placeholder="Email" type="email" />
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
                            name="password" value={signupData.password} onChange={(e) => handleSignupnData(e)}
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="text-muted font-italic">
                        <small>
                          password strength:{" "}
                          <span className="text-success font-weight-700">
                            strong
                          </span>
                        </small>
                      </div>
                      <Row className="my-4">
                        <Col xs="12">
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                              className="custom-control-input"
                              id="customCheckRegister"
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheckRegister"
                            >
                              <span>
                                I agree with the{" "}
                                <a
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Privacy Policy
                                </a>
                              </span>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center">
                        { signupData.name == "" || signupData.email == "" ||signupData.age == 0 
                        || signupData.username == "" || signupData.place == "" 
                        || signupData.password == "" ? (

                          <Button
                            className="opacity-40 font-family white-color blue-backgroundcolor mt-4"
                            color=""
                            type="button"
                          >
                          CREA ACCOUNT
                        </Button>
                        ):(
                          <Button
                          onClick={(e) => signup(e)}
                          className="font-family white-color blue-backgroundcolor mt-4"
                          color=""
                          type="button"
                        >
                          CREA ACCOUNT
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
        <SimpleFooter />
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openAlert} autoHideDuration={3000} onClose={(e) => setOpenAlert(false)}>
          <Alert severity={typeAlert} sx={{ width: '340px' }}>
            {messageAlert}
          </Alert>
        </Snackbar>
    </>
  );
}
