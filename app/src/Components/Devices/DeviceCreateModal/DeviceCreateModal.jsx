import { useState } from "react";
import { createDevice } from "../../../../firebase/Firebase"; // Assuming you have a function for creating a device
import { Button, Modal, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const CreateDeviceModal = ({ showModal, closeModal }) => {
  const [deviceInfo, setDeviceInfo] = useState({ name: "",  color: "", storage: "", imageUrl: "", price: "" });
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeviceInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleCreateDevice = () => {
    const path = location.pathname;
    // Validate input fields if needed
    createDevice(deviceInfo, path)
      .then(() => {
        // Close the modal and update the device list
        closeModal();
      })
      .catch((error) => console.error("Error creating device:", error));
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create Device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={deviceInfo.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="color">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter color"
              name="color"
              value={deviceInfo.color}
              onChange={handleInputChange}
            />
          </Form.Group><Form.Group controlId="storage">
            <Form.Label>storage</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter storage"
              name="storage"
              value={deviceInfo.storage}
              onChange={handleInputChange}
            />
          </Form.Group><Form.Group controlId="imageUrl">
            <Form.Label>ImageUrl</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ImageUrl"
              name="imageUrl"
              value={deviceInfo.imageUrl}
              onChange={handleInputChange}
            />
          </Form.Group><Form.Group controlId="price">
            <Form.Label>price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              name="price"
              value={deviceInfo.price}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCreateDevice}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDeviceModal;
