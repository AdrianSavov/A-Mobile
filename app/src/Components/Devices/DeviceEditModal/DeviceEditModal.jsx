import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { updateDevice } from "../../../../firebase/Firebase"; 
import { reload } from "firebase/auth";
import { toast } from "react-toastify";

const DeviceEditModal = ({ show, handleClose, deviceDetails }) => {
  const location = useLocation();
  const [editedDetails, setEditedDetails] = useState(
    Array.isArray(deviceDetails)
      ? deviceDetails.reduce((acc, cur) => {
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

  const handleSave = async () => {
    try {
      const devId = deviceDetails._id;
      const path = location.pathname;
      await updateDevice(devId, path, editedDetails); 
      
      toast.success("Device details updated successfully");

    } catch (error) {
      toast.error("Error updating device details:", error);
    } finally {
      handleClose();
    }
  };

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
