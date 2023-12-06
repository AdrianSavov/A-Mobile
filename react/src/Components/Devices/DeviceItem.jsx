import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { getOneDevice, deleteDevice } from "../../../firebase/Firebase";
import { useAuthState } from "../../authProvider/Auth";
import DeviceEditModal from "./DeviceEditModal/DeviceEditModal";
import "./DeviceItem.css";

const DeviceItem = ({
  deviceImg,
  deviceName,
  devicePrice,
  deviceStorage,
  deviceId,
}) => {
  const [deviceDetails, setDeviceDetails] = useState({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const location = useLocation();
  const { user } = useAuthState();

  const handleClick = async (event) => {
    const devId = event.currentTarget.id;
    const path = location.pathname;
    const combined = `${path}/${devId}`;

    try {
      const result = await getOneDevice(combined);
      setDeviceDetails(result);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error fetching device details:", error);
    }
  };

  const handleCloseDetailsModal = () => setShowDetailsModal(false);

  const handleShowEditModal = async () => {
    // Fetch device details directly using deviceId
    try {
      const path = location.pathname;
      const result = await getOneDevice(`${path}/${deviceId}`);
      setDeviceDetails(Object.fromEntries(result));
      handleCloseDetailsModal();
      setShowEditModal(true);
    } catch (error) {
      console.error("Error fetching device details:", error);
    }
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleDelete = async () => {
    try {
      const path = location.pathname;
      console.log(path);
      console.log(deviceId);
      await deleteDevice(path, deviceId);
      console.log("Device deleted successfully!");
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };
  return (
    <>
      <Card className="my-card" id={deviceId}>
        <Card.Img src={deviceImg} alt={deviceName} />
        <div className="middle">
          <Button variant="primary" id={deviceId} onClick={handleClick}>
            Details
          </Button>
        </div>
        <Card.Body>
          <Card.Title>{deviceName}</Card.Title>
          <Card.Text>Price: {devicePrice}</Card.Text>
          <Card.Text>Storage: {deviceStorage}</Card.Text>
          {user && user.displayName === "admin" && (
            <div className="additional-btns">
              <Button variant="secondary" onClick={handleShowEditModal}>
                EDIT
              </Button>
              <Button
                variant="secondary"
                onClick={handleDelete}
              >
                DELETE
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
        <Modal.Header>
          <Modal.Title className="modal-title">Device Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deviceDetails &&
            Object.entries(deviceDetails).map(([key, value], index) => {
              if (value[0] !== "imageUrl" && value[0] !== "_id") {
                return <p key={index}>{`${value[0]}: ${value[1]}`}</p>;
              }
              return null;
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <DeviceEditModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        deviceDetails={deviceDetails}
      />
    </>
    
  );
};

export default DeviceItem;
