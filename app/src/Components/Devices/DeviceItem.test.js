import { render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DeviceItem from "./DeviceItem";
import { AuthProvider } from "../../authProvider/Auth";
import { CartProvider } from "../Navbar/CartContext";

test("Renders DeviceItem component", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <DeviceItem
              deviceImg="test-image.jpg"
              deviceName="Test Device"
              devicePrice={100}
              deviceStorage="256 GB"
              deviceId="test-device-id"
            />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  });

  await waitFor(() => {
    const deviceNameElement = screen.getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "div" &&
        content.includes("Test Device")
      );
    });

    const devicePriceElement = screen.getByText("Price: $100");
    const deviceStorageElement = screen.getByText("Storage: 256 GB");

    expect(deviceNameElement).toBeInTheDocument();
    expect(devicePriceElement).toBeInTheDocument();
    expect(deviceStorageElement).toBeInTheDocument();
  });
});
