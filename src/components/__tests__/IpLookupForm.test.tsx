import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { IpLookupForm } from "../IpLookupForm";

global.fetch = jest.fn().mockImplementation(() => ({
  json: () => Promise.resolve({ result: [] }),
}));

describe("IpLookupForm", () => {
  it("adds an IP address to the staging area", () => {
    const { getByLabelText, getByRole } = render(<IpLookupForm />);
    const input = getByLabelText("Enter an IP address");
    const addButton = getByRole("button", { name: "+" });

    fireEvent.change(input, { target: { value: "24.207.47.115" } });
    fireEvent.click(addButton);
    expect(getByRole("list")).toHaveTextContent("24.207.47.115");
  });

  it("fetches IP data and displays results", async () => {
    const { getByLabelText, getByRole } = render(<IpLookupForm />);
    const input = getByLabelText("Enter an IP address");
    const addButton = getByRole("button", { name: "+" });
    const geolocateButton = getByRole("button", {
      name: /geolocate/i,
    });

    fireEvent.change(input, { target: { value: "24.207.43.112" } });
    fireEvent.click(addButton);
    fireEvent.click(geolocateButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });
});
