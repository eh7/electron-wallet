import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from 'react-bootstrap';

const NavbarComponent = () => {
  return (
    <div>
      <Navbar fixed="top" bg="secondary" variant="dark">
        <Container>
          <Navbar.Brand>
            <Button size="l" variant="secondary" href="/">React Wallet</Button>
          </Navbar.Brand>
          <Nav variant="pils">
            <Nav.Item className="btn-outline">
              <Nav.Link eventKey="/" href="/" className="btn-outline">home</Nav.Link>
            </Nav.Item>
            <Nav.Item className="btn-outline">
              <Nav.Link eventKey="/settings" href="/seetings" className="btn-outline">settings</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
