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
import React from "react";
import '../../../assets/css/pattern.css'
import '../../../assets/css/style.css'
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import { DemoNavbar } from "../../../components/Navbars/DemoNavbar";

// index page sections
import Download from "../../IndexSections/Download.js";
import { Navigate, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

export const HomePage = () => {

  const navigate = useNavigate()

  return (
    <>
      <DemoNavbar />
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-lg section-shaped pb-250">
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
                  <Col lg="6">
                    <h1 className="font-size-34 font-family display-3 text-white">
                      Muoviti facile con MyPooling
                      <span className="font-size-28 font-family">Veloce, Efficace e sfizioso</span>
                    </h1>
                    <p className="font-family lead text-white">
                      Ti aiuteremo a trovare facilmente qualcuno che possa accompagnarti per arrivare a ... nel modo pù immediato possibile!
                    </p>
                    <div className="btn-wrapper">
                      <Button
                        onClick={(e) => navigate("/choose")}
                        color=""
                        className="border-none-i hoverbtn white-color blue-backgroundcolor btn-icon mb-3 mb-sm-0"
                      >
                        <span  className="font-family btn-inner--text">Cerca un passaggio</span>
                      </Button>
                      <Button
                        onClick={(e) => navigate("/add_trip")}
                        color=""
                        className="blue-border border-smaller-i ok-backgroundcolor mb-3 mb-sm-0 ml-1"
                      >
                        <span className="font-family blue-color btn-inner--text">
                          Offri un passaggio
                        </span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
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
          {/* 1st Hero Variation */}
        </div>
        <section className="section section-lg pt-lg-0 mt--200">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="white-color blue-backgroundcolor icon icon-shape icon-shape-primary rounded-circle mb-4">
                          <i className="ni ni-check-bold" />
                        </div>
                        <h6 className="font-family font-weight-500 text-uppercase">
                          Cosa puoi fare qui
                        </h6>
                        <p className="description mt-3">
                          Qui puoi trovare facilmente un passaggio per arrivare a ... o tornare indietro filtrando data, distanza e punto di incontro con il tuo autista
                        </p>
                        <Button
                          className="font-family hoverbtn blue-backgroundcolor white-color mt-4"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          Car Pooling
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="white-color blue-backgroundcolor icon icon-shape icon-shape-success rounded-circle mb-4">
                          <i className="ni ni-istanbul" />
                        </div>
                        <h6 className="font-family black-color font-weight-500 text-uppercase">
                          Perchè utilizzarlo?
                        </h6>
                        <p className="description mt-3">
                          Molto spesso ti potresti trovare in difficolta ad arrivare a destinazione. Con noi puoi facilmente trovare il passaggio più conveniente. Utilizzando meno auto diminuirà fino al 40% lo smog!
                        </p>
                        <Button
                          className="font-family hoverbtn white-color blue-backgroundcolor mt-4"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          AMBIENTE
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="white-color blue-backgroundcolor icon icon-shape icon-shape-warning rounded-circle mb-4">
                          <i className="ni ni-planet" />
                        </div>
                        <h6 className="font-family black-color font-weight-500 text-uppercase">
                          Come funziona
                        </h6>
                        <p className="description mt-3">
                          Ti basta premere in alto a destra per accedere o creare una ccount. Dopodichè potrai offrire un passaggio o cercarne uno tramite il nostro servizio
                        </p>
                        <Button
                          className="font-family border-none-i hoverbtn white-color blue-backgroundcolor mt-4"
                          color=""
                          onClick={(e) => navigate("/signup")}
                        >
                          INIZIA
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
    </>
  );
}
