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

// core components
import { BASE_URL } from '../../../config.ts'
import { DemoNavbar } from "../../../components/Navbars/DemoNavbar";
import SimpleFooter from "../../../components/Footers/SimpleFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { SpinnerCircular } from "spinners-react";

export const Signin = () => {

  const [loginData, setLoginData] = useState({
    'email': "",
    'password': ""
  })

  const [isLoading, setIsLoading] = useState(false)

  const [openAlert, setOpenAlert] = useState(false)

  const [messageAlert, setMessageAlert] = useState("")

  const [typeAlert, setTypeAlert] = useState("");

  const navigate = useNavigate()

  const handleLoginData = (e) => {
    const newLoginData = {...loginData};
    newLoginData[e.target.name] = e.target.value;
    setLoginData(newLoginData);
  }

  const login = async (e) => {
    setIsLoading(true);
    await axios.post(BASE_URL + '/user/signin', loginData)
    .then(response => {
      setOpenAlert(true)
      setMessageAlert("Login effettuato con successo")
      setTypeAlert("success")
      setTimeout(() => {
        setIsLoading(false)
        window.localStorage.setItem('token', response.data.param)
        navigate("/")
      }, 2400);
    })
    .catch(error => {
      setOpenAlert(true);
      setMessageAlert("Credenziali non valide")
      setTypeAlert("error")
      setIsLoading(false)
      console.log(error)
    })
  }

  return (
    <>
      <DemoNavbar />
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
                      <small className="blue-color font-family font-size-16">Sign in with</small>
                    </div>
                    <div className="btn-wrapper text-center">
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src={require("../../../assets/img/icons/common/github.svg")}
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
                      <small className="font-size-16 font-family blue-color">Or sign in with credentials</small>
                    </div>
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input name='email' value={loginData.email} onChange={(e) => handleLoginData(e)} placeholder="Email" type="email" />
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
                            name="password"
                            onChange={(e) => handleLoginData(e)}
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            value={loginData.password}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id=" customCheckLogin"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor=" customCheckLogin"
                        >
                          <span>Remember me</span>
                        </label>
                      </div>
                      <div className="text-center">
                        {
                          loginData.email == "" || loginData.password == "" ? (
                            <Button
                            className="opacity-40 white-color blue-backgroundcolor my-4"
                            color=""
                            type="button"
                          >
                            ACCEDI
                          </Button>
                          ):(
                            isLoading ? (
                              <Button
                              className="white-color blue-backgroundcolor my-4"
                              color=""
                              type="button"
                            >
                              <SpinnerCircular size={20} color='#589df8' thickness={200} secondaryColor={'white'} />
                            </Button>
                            ):(
                              <Button
                              onClick={(e) => login(e)}
                              className="white-color blue-backgroundcolor my-4"
                              color=""
                              type="button"
                              >
                                ACCEDI
                              </Button>
                            )
                          )
                        }
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                <Row className="mt-3">
                  <Col xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={(e) => e.preventDefault(e)}
                    >
                      <small className="blue-color">Forgot password?</small>
                    </a>
                  </Col>
                  <Col className="text-right" xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={(e) => e.preventDefault(e)}
                    >
                      <small className="blue-color">Create new account</small>
                    </a>
                  </Col>
                </Row>
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
