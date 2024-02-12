import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCart } from "../Navbar/CartContext";

const PurchaseModal = ({ show, onHide }) => {
const { dispatch: cartDispatch } = useCart();
const [purchaseInfo, setPurchaseInfo] = useState({ name: "",  phone: "", address: "", postCode: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPurchaseInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePurchase = () => {
    try {
      if (!purchaseInfo.name || !purchaseInfo.phone || !purchaseInfo.address || !purchaseInfo.postCode) {
        toast.error("Please fill all fields.");
        return;
      }
      // Clear the cart after the purchase is made
      cartDispatch({ type: "PURCHASE_ITEMS" });
  
      toast.success("Thank you for the order! We'll keep you in touch for further information!");

      onHide();
    } catch (error) {
      toast.error("An error occurred during the purchase. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Purchase Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              name="name"
              value={purchaseInfo.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="+359"
              name="phone"
              value={purchaseInfo.phone}
              onChange={handleInputChange}
            />
          </Form.Group><Form.Group controlId="address">
            <Form.Label>Delivery Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address for delivery"
              name="address"
              value={purchaseInfo.address}
              onChange={handleInputChange}
            />
          </Form.Group><Form.Group controlId="postCode">
            <Form.Label>Post Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter post code"
              name="postCode"
              value={purchaseInfo.postCode}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handlePurchase}>
          Purchase
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseModal;
