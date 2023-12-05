import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const DeviceEditModal = ({ show, handleClose, deviceDetails }) => {
  // Convert array to object if deviceDetails is an array
  const [editedDetails, setEditedDetails] = useState(
    Array.isArray(deviceDetails)
      ? deviceDetails.reduce((acc, cur, index) => {
          acc[cur[0]] = cur[1];
          return acc;
        }, {})
      : { ...deviceDetails }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Save clicked", editedDetails);
  };

  // Update editedDetails when deviceDetails changes
  useEffect(() => {
    setEditedDetails(Array.isArray(deviceDetails) ? Object.fromEntries(deviceDetails) : { ...deviceDetails });
  }, [deviceDetails]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="modal-title">Edit Device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.entries(editedDetails).map(([key, value], index) => (
          <div key={index}>
            <label>{key}</label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeviceEditModal;
