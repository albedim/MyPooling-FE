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
import { useNavigate } from "react-router-dom";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

export const Hero = () => {

    const navigate = useNavigate()

    return (
      <>
        <div className="position-relative">
          {/* Hero for FREE version */}
          <section className="section section-hero section-shaped">
            {/* Background circles */}
            <div className="shape shape-style-1 shape-default">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>
            <Container className="shape-container d-flex align-items-center py-lg">
              <div className="space-around display-flex width-540 height-full col px-0">
                <Row className="width-540 space-between display-flex">
                  <div className="display-flex mt-5">
                    <Button
                    onClick={(e) => navigate("/go_to")}
                      className="align-center space-around display-flex height-64 width-240 font-family white-color border-none-i blue-backgroundcolor btn-icon mb-3 mb-sm-0"
                      color=""
                    >
                      <span className="btn-inner--text">Vai a destinazione</span>
                    </Button>
                  </div>
                  <div className="display-flex mt-5">
                    <Button
                    onClick={(e) => navigate("/go_home")}
                      className="white-backgroundcolor align-center space-around display-flex height-64 width-240 ok-backgroundcolor mb-3 mb-sm-0"
                      color=""
                    >
                      <span className="blue-color mr-1">Torna a casa</span>
                    </Button>
                  </div>
                </Row>
              </div>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
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
        </div>
      </>
    );
  }