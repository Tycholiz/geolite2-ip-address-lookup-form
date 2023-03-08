import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { StagingIpAddresses } from "../StagingIpAddresses";

const mockSetIpAddresses = jest.fn();

describe("StagingIpAddresses", () => {
  let ipAddresses = ["123.634.34.346"];
  it("should render without errors", () => {
    render(
      <StagingIpAddresses
        ipAddresses={ipAddresses}
        setIpAddresses={mockSetIpAddresses}
      />
    );
    expect(screen.getByLabelText("Enter an IP address")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
  });

  it("should change state when user types in the input field", () => {
    render(
      <StagingIpAddresses
        ipAddresses={ipAddresses}
        setIpAddresses={mockSetIpAddresses}
      />
    );
    const input = screen.getByLabelText(
      "Enter an IP address"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "192.168.0.1" } });
    expect(input.value).toBe("192.168.0.1");
  });

  it("should submit the form when user enters a valid IP addresses", () => {
    render(
      <StagingIpAddresses
        ipAddresses={ipAddresses}
        setIpAddresses={mockSetIpAddresses}
      />
    );
    const input = screen.getByLabelText(
      "Enter an IP address"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "84.107.27.135" } });
    fireEvent.submit(screen.getByRole("button", { name: "+" }));
    expect(mockSetIpAddresses).toHaveBeenCalled();
  });

  it("should display an error message when user enters a string that is not an IP address", () => {
    render(
      <StagingIpAddresses
        ipAddresses={ipAddresses}
        setIpAddresses={mockSetIpAddresses}
      />
    );
    const input = screen.getByLabelText(
      "Enter an IP address"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "invalid_IP" } });
    fireEvent.submit(screen.getByRole("button", { name: "+" }));
    expect(
      screen.getByText("Please enter a valid IP address.")
    ).toBeInTheDocument();
  });
  it("should display an error message when user enters a non-remote IP address", () => {
    render(
      <StagingIpAddresses
        ipAddresses={ipAddresses}
        setIpAddresses={mockSetIpAddresses}
      />
    );
    const input = screen.getByLabelText(
      "Enter an IP address"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "192.168.0.1" } });
    fireEvent.submit(screen.getByRole("button", { name: "+" }));
    expect(
      screen.getByText("Please enter a valid IP address.")
    ).toBeInTheDocument();
  });
});
