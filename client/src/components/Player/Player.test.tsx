import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { track } from "mocks/tracks";
import { renderWithClient } from "helpers/renderWithClient";
import Player from "./Player";
import { mockedStore } from "mocks/store/track";

jest.mock("store/track", () => {
  return jest.fn((fn) => (fn ? fn(mockedStore) : mockedStore));
});

/* Can't figure it out with Audio HTML Element */
describe("Player", () => {
  beforeAll(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without errors", async () => {
    const { getByTestId } = renderWithClient(<Player />);
    await waitFor(() => getByTestId("player"));
    expect(getByTestId("player")).toBeInTheDocument();
  });

  it("shows the name of the current track", () => {
    render(<Player />);
    const trackNameElement = screen.getByText(track.name);
    expect(trackNameElement).toBeInTheDocument();
  });

  // it("pauses the audio when the playback control is clicked", async () => {
  //   render(<Player />);

  //   await act(async () => {
  //     const playBtn = screen.getByTestId("play-btn");
  //     userEvent.click(playBtn);
  //     await waitFor(() => expect(window.Audio.mock.instances[0].play).toHaveBeenCalledTimes(1));
  //   });

  //   await act(async () => {
  //     const pauseBtn = screen.getByTestId("pause-btn");
  //     userEvent.click(pauseBtn);
  //     await waitFor(() => expect(window.Audio.mock.instances[0].pause).toHaveBeenCalledTimes(1));
  //   });
  // });

  // it("sets the audio volume when the volume range is changed", () => {
  //   render(<Player />);
  //   const volumeRangeElement = screen.getByLabelText("Volume Range");
  //   userEvent.click(volumeRangeElement, { clientX: 50 });
  //   const audioElement = screen.getByRole("audio");
  //   expect(audioElement.volume).toBe(0.5);
  // });

  // it("updates the audio current time when the time range is changed", () => {
  //   render(<Player />);
  //   const timeRangeElement = screen.getByLabelText("Time Range");
  //   userEvent.click(timeRangeElement, { clientX: 50 });
  //   const audioElement = screen.getByRole("audio");
  //   expect(audioElement.currentTime).toBeGreaterThan(0);
  // });
});
