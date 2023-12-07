import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { updateDevice } from "../../../../firebase/Firebase"; 

const DeviceEditModal = ({ show, handleClose, deviceDetails }) => {
  const location = useLocation();
  // State to store edited details
  const [editedDetails, setEditedDetails] = useState(
    Array.isArray(deviceDetails)
      ? deviceDetails.reduce((acc, cur) => {
          acc[cur[0]] = cur[1];
          return acc;
        }, {})
      : { ...deviceDetails }
  );

  // Handler for input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handler for save button click
  const handleSave = async () => {
    try {
      // PUT request to update device details
      const devId = deviceDetails._id;
      const path = location.pathname;
      await updateDevice(devId, path, editedDetails); 
      
      console.log("Device details updated successfully");

    } catch (error) {
      console.error("Error updating device details:", error);
    } finally {
      handleClose();
    }
  };

  // Update editedDetails when deviceDetails changes
  useEffect(() => {
    setEditedDetails(
      Array.isArray(deviceDetails)
        ? Object.fromEntries(deviceDetails)
        : { ...deviceDetails }
    );
  }, [deviceDetails]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="modal-title">Edit Device</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        {Object.entries(editedDetails).map(([key, value], index) => (
          <div className="input-row" key={index}>
            <div className="label">{key}</div>
            <div className="input-container">
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="value-input"
              />
            </div>
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
