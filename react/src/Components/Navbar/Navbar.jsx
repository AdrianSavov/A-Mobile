import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import './navbarStyle.css';


function NavbarItem() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container className='nav-container'>
      <Navbar.Brand as={Link} to='/'>A-Mobile</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
          <Nav.Link as={Link} to="mobile-plans">Mobile Plans</Nav.Link>
          <NavDropdown title="Devices" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="cellphones">Cellphones</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='smartphones'>
              Smartphones
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to='smartwatches'>Smart Watches</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavbarItem;
