import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import useTrackStore from "store/track";
import VolumeRange from "./VolumeRange";
import { mockedStore } from "mocks/store/track";

jest.mock("store/track", () => {
  return jest.fn((fn) => (fn ? fn(mockedStore) : mockedStore));
});

describe("VolumeRange", () => {
  const audio = {} as HTMLAudioElement;

  it("should display a slider with correct label and initial value", () => {
    render(<VolumeRange audio={audio} />);
    const slider = screen.getByLabelText("Volume");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("type", "range");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "100");
    expect(slider).toHaveAttribute("value", "50");
  });

  it("should update volume when slider value changes", () => {
    render(<VolumeRange audio={audio} />);
    const slider = screen.getByLabelText("Volume");
    fireEvent.change(slider, { target: { value: "75" } });
    expect(useTrackStore().setVolume).toHaveBeenCalledWith(75);
    expect(audio.volume).toBe(0.75);
  });
});
