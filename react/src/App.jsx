import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';

import { Routes, Route } from 'react-router-dom';


import SmartphoneList from "./components/devices/SmartphoneList";
import CellPhoneList from './components/devices/CellPhoneList';
import SmartWatchList from './components/devices/SmartWatchList';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="smartphones" element={<SmartphoneList />} />
          <Route path="cellphones" element={<CellPhoneList />} />
          <Route path="smartwatches" element={<SmartWatchList />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
