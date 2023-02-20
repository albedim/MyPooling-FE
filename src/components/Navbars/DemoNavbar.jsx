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
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import jwt from 'jwt-decode'
import BasicMenu from "../../views/examples/own/BasicMenu";
import { IonIcon } from "react-ion-icon";

export const DemoNavbar = () => {

  const navigate = useNavigate();

  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <img
                alt="..."
                src={require('../../assets/img/icon.png')}
              />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              toggler="#navbar_global"
              navbar
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src="assets/img/brand/argon-react.png"
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    id="tooltip333589074"
                    target="_blank"
                  >
                  <i className="fa fa-facebook-square" />
                  <span className="nav-link-inner--text d-lg-none ml-2">
                    Facebook
                  </span>
                  </NavLink>
                  <UncontrolledTooltip delay={0} target="tooltip333589074">
                    Le tue notifiche
                  </UncontrolledTooltip>
                </NavItem>
                {
                  window.localStorage.getItem('token') == null ? (
                    <NavItem className="d-none d-lg-block ml-lg-4">
                      <Button
                      onClick={(e) => navigate("/signin")}
                        color=""
                        className="blue-border border-smaller-i ok-backgroundcolor"
                      >
                        <span className="blue-color nav-link-inner--text ml-1">
                          ACCEDI
                        </span>
                      </Button>
                    </NavItem>
                  ):(
                    <NavItem className="d-none d-lg-block ml-lg-4">
                      <BasicMenu userName={jwt(window.localStorage.getItem('token')).sub.username}/>
                      <IonIcon name="search" />
                    </NavItem>
                  )
                }
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
