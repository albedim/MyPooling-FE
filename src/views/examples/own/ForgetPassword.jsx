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
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { Loading } from "./Loading";


export const ForgetPassword = () => {

  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false)

  const [openAlert, setOpenAlert] = useState(false)

  const [messageAlert, setMessageAlert] = useState("")

  const [typeAlert, setTypeAlert] = useState("");


  const createPasswordForgottenToken = async (e) => {
    setIsLoading(true);
    await axios.put(BASE_URL + '/user/password_forgotten_token/' + email)
      .then(response => {
        setOpenAlert(true)
        setMessageAlert("Ti abbiamo mandato un email")
        setTypeAlert("success")
        setIsLoading(false)
      })
      .catch(error => {
        setOpenAlert(true);
        setMessageAlert("Non esiste un account con questa email")
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
      <section className="height-640 section section-lg section-shaped pb-250">
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
                <CardHeader>
                  <span>Cambia la tua password</span>
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
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      {
                        email == "" ? (
                          <Button
                            className="opacity-40 white-color blue-backgroundcolor my-4"
                            color=""
                            type="button"
                          >
                            AVANTI
                          </Button>
                        ) : (
                          <Button
                            onClick={(e) => createPasswordForgottenToken(e)}
                            className="white-color blue-backgroundcolor my-4"
                            color=""
                            type="button"
                          >
                            AVANTI
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
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openAlert} autoHideDuration={3000} onClose={(e) => setOpenAlert(false)}>
        <Alert severity={typeAlert} sx={{ width: '340px' }}>
          {messageAlert}
        </Alert>
      </Snackbar>
    </>
  );
}
