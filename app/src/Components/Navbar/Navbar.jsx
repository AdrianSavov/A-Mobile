import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../../authProvider/Auth";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useCart } from "./CartContext";
import "./navbarStyle.css";
import { BsCart } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

function NavbarItem() {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const { state: cartState } = useCart();
  const { dispatch: cartDispatch } = useCart();

  const handleRemoveItem = (itemId) => {
    // Dispatch an action to remove the item from the cart
    cartDispatch({ type: "REMOVE_ITEM", payload: { id: itemId } });
    toast.info("You removed the device!");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      // Remove authentication token from localStorage
      localStorage.removeItem("authToken");

      dispatch({ type: "SET_USER", payload: null });

      toast.info("Logged out...");
    } catch (error) {
      toast.error("Error logging out:", error);
    }
    navigate("/");
  };

  const isAuthenticated = user && user.uid && localStorage.getItem("authToken");
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="nav-container">
        <Navbar.Brand as={Link} to="/">
          A-Mobile
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="mobile-plans">
              Mobile Plans
            </Nav.Link>
            <NavDropdown title="Devices" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="cellphones">
                Cellphones
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="smartphones">
                Smartphones
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="smartwatches">
                Smart Watches
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="about">
              About Us
            </Nav.Link>
          </Nav>
          <Nav>
            {user && user.displayName !== "admin" && (
              <>
                {/* Cart Dropdown */}
                <NavDropdown
                  title={
                    <div>
                      <BsCart size={24} />
                      <span className="badge bg-danger">
                        {cartState.items.length}
                      </span>
                    </div>
                  }
                  id="cart-dropdown"
                >
                  {cartState.items.length === 0 ? (
                    <NavDropdown.Item>No items in the cart</NavDropdown.Item>
                  ) : (
                    <>
                      {cartState.items.map((item) => (
                        <NavDropdown.Item key={item.id}>
                          {/* Display information about the added device */}
                          <div>
                            <strong>Device: {item.name}</strong>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={(e) => {
                                handleRemoveItem(item.id);
                                e.stopPropagation();
                              }}
                            >
                              <AiOutlineDelete />
                            </button>
                          </div>
                        </NavDropdown.Item>
                      ))}
                      {/* Calculate and display the total price for all items in the cart */}
                      {cartState.items.length > 0 && <NavDropdown.Divider />}
                      {cartState.items.length > 0 && (
                        <NavDropdown.Item>
                          <div className="total-price">
                            <strong>Total Price:</strong>
                          </div>
                          <div className="total-price">
                            <strong>
                              $
                              {cartState.items.reduce(
                                (total, item) =>
                                  total + item.quantity * item.price,
                                0
                              )}
                            </strong>
                          </div>
                        </NavDropdown.Item>
                      )}
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/cart">
                        Purchase here
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </>
            )}
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <NavDropdown title={user.email} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarItem;
