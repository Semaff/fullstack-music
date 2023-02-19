import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import useTrackStore from "store/track";
import TimeRange from "./TimeRange";
import { mockedStore } from "mocks/store/track";

jest.mock("store/track", () => {
  return jest.fn((fn) => (fn ? fn(mockedStore) : mockedStore));
});

describe("TimeRange", () => {
  const audio = {} as HTMLAudioElement;

  it("should display a slider with correct label and initial value", () => {
    render(<TimeRange audio={audio} />);
    const slider = screen.getByLabelText("Time");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("type", "range");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "120");
    expect(slider).toHaveAttribute("value", "10");
  });

  it("should update current time when slider value changes", () => {
    render(<TimeRange audio={audio} />);
    const slider = screen.getByLabelText("Time");
    fireEvent.change(slider, { target: { value: "75" } });
    expect(useTrackStore().setTime).toHaveBeenCalledWith(75);
    expect(audio.currentTime).toBe(75);
  });
});
