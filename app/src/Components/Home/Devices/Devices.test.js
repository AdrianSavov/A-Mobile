import { render, screen, fireEvent } from "@testing-library/react";
import Devices from "./Devices";
import { useNavigate } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

test("renders Devices component", () => {
  render(
    <MemoryRouter>
      <Devices />
    </MemoryRouter>
  );

  const smartphonesCard = screen.getByText("Smart Phones");
  const smartwatchesCard = screen.getByText("Smart Watches");
  expect(smartphonesCard).toBeInTheDocument();
  expect(smartwatchesCard).toBeInTheDocument();

  
});

test("navigates to /smartphones when smartphones card is clicked", () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(
        <MemoryRouter>
          <Devices />
        </MemoryRouter>
      );

  const smartphonesCard = screen.getByText("Smart Phones");
  fireEvent.click(smartphonesCard);

  expect(navigateMock).toHaveBeenCalledWith("/smartphones");
});

test("navigates to /smartwatches when smartwatches card is clicked", () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(
        <MemoryRouter>
          <Devices />
        </MemoryRouter>
      );

  const smartwatchesCard = screen.getByText("Smart Watches");
  fireEvent.click(smartwatchesCard);

  expect(navigateMock).toHaveBeenCalledWith("/smartwatches");
});
