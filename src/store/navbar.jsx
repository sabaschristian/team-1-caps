import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import "./store.css";
import { useState } from "react";

function StoreNavBar(props) {
  const [currentLink, setCurrentLink] = useState(
    window.location.pathname.substring(1)
  );
  let isUserLoggedIn = false;
  try {
    isUserLoggedIn = JSON.parse(localStorage.getItem("user"));
    if (isUserLoggedIn && isUserLoggedIn.id) {
      // do nothing, continue lang
    } else {
      localStorage.clear();
      window.location.href = "http://localhost:3000/login";
    }
  } catch (error) {
    localStorage.clear();
    window.location.href = "http://localhost:3000/login";
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to="/all-products" className="navbar-components" onClick={()=>{props.setCurrentLink('/all-products')}}
>All Products</Link></Nav.Link>
            <Nav.Link><Link to="/box-mods" className="navbar-components" >Box Mods</Link></Nav.Link>
            <Nav.Link><Link to="/replacement-pods" className="navbar-components">Replacement Pods</Link></Nav.Link>
            <Nav.Link><Link to="/replacement-coils" className="navbar-components">Replacement Coils</Link></Nav.Link>
            <NavDropdown title="Vape Kits" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                Box mod kit
              </NavDropdown.Item>
              <NavDropdown.Item>
                Pod Kit
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default StoreNavBar;
