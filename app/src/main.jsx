import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./authProvider/Auth.jsx";
import { UserProvider } from "./Components/Login/UserContext.jsx";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./Components/Navbar/CartContext.jsx";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
          <App />
          </CartProvider>
          <ToastContainer position="top-center" autoClose="2500" />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
