import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./DeviceItem.css";

const DeviceItem = ({
  deviceImg,
  deviceName,
  devicePrice,
  deviceStorage,
  deviceId,
}) => {
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [show, setShow] = useState(false);
  const location = useLocation();

  const handleClick = async (event) => {
    const devId = event.currentTarget.id;
    const path = location.pathname;

    const response = await fetch(
      `http://localhost:3030/jsonstore${path}/${devId}`
    );
    const data = await response.json();
    // const result = Object.entries(data);

    setDeviceDetails(data);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
      <><Card className="my-card" id={deviceId}>
      <Card.Img src={deviceImg} alt={deviceName} />
      <div className="middle">
        <Button variant="primary" id={deviceId} onClick={handleClick}>
          Details
        </Button>
      </div>
      <Card.Body>
        <Card.Title>{deviceName}</Card.Title>
        <Card.Text>
          Price: {devicePrice}
        </Card.Text>
        <Card.Text>
          Price: {deviceStorage}
        </Card.Text>
      </Card.Body>
    </Card><Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="modal-title">Device Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deviceDetails &&
            Object.entries(deviceDetails).map(([key, value], index) => {
              if (key !== "imageUrl" && key !== "_id") {
                return <p key={index}>{`${key}: ${value}`}</p>;
              }
              return null;
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal></>
  );
};

export default DeviceItem;
