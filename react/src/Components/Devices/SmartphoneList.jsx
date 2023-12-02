import { useState, useEffect } from "react";
import { getAllSmartphones } from "../../../firebase/Firebase";
import DeviceItem from "./DeviceItem";

const PhoneList = () => {
  const [devices, setDevices] = useState([]);

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
