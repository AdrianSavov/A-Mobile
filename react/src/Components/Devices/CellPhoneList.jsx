import { useState, useEffect } from "react";
import { getAllCellphones } from "../../../firebase/Firebase";
import DeviceItem from "./DeviceItem";
import { useAuthState } from "../../authProvider/Auth";
import {Button } from "react-bootstrap";
import DeviceCreateModal from '../Devices/DeviceCreateModal/DeviceCreateModal';

const CellphoneList = () => {
  const [devices, setDevices] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const { user } = useAuthState();

  useEffect(() => {
    getAllCellphones()
      .then((result) => setDevices(result))
      .catch((err) => console.log(err));
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="device-container">
      {devices.map((device) => (
        <DeviceItem
          key={device._id}
          deviceId={device._id}
          deviceName={device.name}
          deviceImg={device.imageUrl}
          devicePrice={device.price}
          deviceStorage={device.storage}
        />
      ))}

      {user && user.displayName === "admin" && (
        <div className="additional-btns">
          <Button variant="primary" onClick={openModal}>
            Create Device
          </Button>
        </div>
      )}

      <DeviceCreateModal showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

export default CellphoneList;
