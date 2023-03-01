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

import { BASE_URL } from '../../../config.ts'
import { DemoNavbar } from "../../../components/Navbars/DemoNavbar";
import SimpleFooter from "../../../components/Footers/SimpleFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { Loading } from "./Loading";


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
    const newLoginData = { ...loginData };
    newLoginData[e.target.name] = e.target.value;
    setLoginData(newLoginData);
  }

  const login = async (e) => {
    console.log(loginData)
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
      })
  }

  return (
    <>
      {
        isLoading &&
        <Loading />
      }
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
                    <small className="font-size-16">ACCEDI</small>
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
                        <span style={{ color: '#787878' }} className="font-size-14 font-family">Ricordami</span>
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
                        ) : (
                          <Button
                            onClick={(e) => login(e)}
                            className="white-color blue-backgroundcolor my-4"
                            color=""
                            type="button"
                          >
                            ACCEDI
                          </Button>
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
                    onClick={(e) => navigate("/forget_password")}
                  >
                    <small className="hover" style={{ fontSize: 16, fontFamily: 'League Spartan', color: '#787878' }}>Password dimenticata?</small>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    onClick={(e) => navigate("/signup")}
                  >
                    <small className="hover" style={{ fontSize: 16, fontFamily: 'League Spartan', color: "#787878" }}>Crea un account</small>
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
