import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import "./navigation.styles.scss";

import { UserContext } from "../../contexts/user.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);

  return (
    <Fragment>
      <>
        {[false].map((expand) => (
          <Navbar
            key={expand}
            expand={expand}
            className="bg-body-tertiary mb-3 px-3"
          >
            <Container fluid>
              <Navbar.Brand href="#">
                <Link to="/">VITall</Link>
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Navigate
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="pt-0">
                  <Nav className="justify-content-end flex-grow-1 my-3 mt-0">
                    <Link className="m-2" to="/">
                      Home
                    </Link>
                    {currentUser ? (
                      <Link className="m-2" to="/profile">
                        Profile
                      </Link>
                    ) : (
                      <>
                        <Link className="m-2" to="/sign-in">
                          Sign In
                        </Link>
                        <Link className="m-2" to="/sign-up">
                          Sign Up
                        </Link>
                      </>
                    )}
                  </Nav>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
