import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { getOneDevice } from "../../../firebase/Firebase";
import { useAuthState } from "../../authProvider/Auth"; 
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
  const { user } = useAuthState();

  const handleClick = async (event) => {
    const devId = event.currentTarget.id;
    const path = location.pathname;
    const combined = `${path}/${devId}`

    getOneDevice(combined)
      .then((result) => setDeviceDetails(result))
      .catch((err) => console.log(err));

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
        {/* Conditionally render buttons for admin */}
        {user && user.displayName === "admin" && (
            <div className="additional-btns">
              <Button variant="secondary" onClick={() => console.log("EDIT clicked")}>
                EDIT
              </Button>
              <Button variant="secondary" onClick={() => console.log("DELETE clicked")}>
                DELETE
              </Button>
            </div>
          )}
      </Card.Body>
    </Card><Modal show={show} onHide={handleClose}>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal></>
  );
};

export default DeviceItem;
