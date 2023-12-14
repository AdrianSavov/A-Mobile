import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate  } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../../authProvider/Auth'; 
import { getAuth, signOut } from 'firebase/auth';
import { toast } from "react-toastify";
import './navbarStyle.css';

function NavbarItem() {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      // Remove authentication token from localStorage
      localStorage.removeItem("authToken");

      dispatch({ type: "SET_USER", payload: null });

      toast.info('Logged out...')

    } catch (error) {
      toast.error("Error logging out:", error);
    }
    navigate('/')
  };

  const isAuthenticated = user && user.uid && localStorage.getItem("authToken");
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
              <NavDropdown.Item as={Link} to='smartphones'>Smartphones</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='smartwatches'>Smart Watches</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="about">About Us</Nav.Link>
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarItem;
