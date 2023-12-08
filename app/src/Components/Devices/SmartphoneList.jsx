import { useState, useEffect } from "react";
import { getAllSmartphones } from "../../../firebase/Firebase";
import DeviceItem from "./DeviceItem";
import { useAuthState } from "../../authProvider/Auth";
import {Button } from "react-bootstrap";
import DeviceCreateModal from '../Devices/DeviceCreateModal/DeviceCreateModal';


const SmartphoneList = () => {
  const [devices, setDevices] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const { user } = useAuthState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllSmartphones();
        setDevices(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

export default SmartphoneList;
