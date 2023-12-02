import { useState, useEffect } from "react";
import { getAllCellphones } from "../../../firebase/Firebase";
import DeviceItem from "./DeviceItem"

const PhoneList = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    
      getAllCellphones()
      .then((result) => setDevices(result))
      .catch((err) => console.log(err));
  }, []);
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
        </div>
  );
};

export default PhoneList;
