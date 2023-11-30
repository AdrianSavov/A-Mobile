import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import MobilePlans from './Components/MobilePlans/MobilePlans';
import SmartphoneList from "./components/devices/SmartphoneList";
import CellPhoneList from './components/devices/CellPhoneList';
import SmartWatchList from './components/devices/SmartWatchList';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="smartphones" element={<SmartphoneList />} />
          <Route path="cellphones" element={<CellPhoneList />} />
          <Route path="smartwatches" element={<SmartWatchList />} />
          <Route path="mobile-plans" element={<MobilePlans />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
