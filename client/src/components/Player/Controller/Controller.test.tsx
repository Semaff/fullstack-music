import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import useTrackStore from "store/track";
import Controller from "./Controller";

jest.mock("store/track"); // Mock the entire module

describe("Controller", () => {
  const mockedUseTrackStore = useTrackStore as unknown as jest.Mock;
  const setIsActiveMock = jest.fn();
  const audio = {
    play: jest.fn(),
    pause: jest.fn()
  } as unknown as HTMLAudioElement;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the play button when not active", () => {
    mockedUseTrackStore.mockReturnValue([false, setIsActiveMock]);
    render(<Controller audio={new Audio()} />);

    const playButton = screen.getByTestId("play-btn");
    expect(playButton).toBeInTheDocument();
  });

  it("should render the pause button when active", () => {
    mockedUseTrackStore.mockReturnValue([true, setIsActiveMock]);
    render(<Controller audio={new Audio()} />);

    const pauseButton = screen.getByTestId("pause-btn");
    expect(pauseButton).toBeInTheDocument();
  });

  it("should call setIsActive and audio.play() when play button is clicked", () => {
    mockedUseTrackStore.mockReturnValue([false, setIsActiveMock]);
    render(<Controller audio={audio} />);
    const playButton = screen.getByTestId("play-btn");
    fireEvent.click(playButton);

    expect(setIsActiveMock).toHaveBeenCalledWith(true);
    expect(audio.play).toHaveBeenCalledTimes(1);
  });

  it("should call setIsActive and audio.pause() when pause button is clicked", () => {
    mockedUseTrackStore.mockReturnValue([true, setIsActiveMock]);
    render(<Controller audio={audio} />);
    const pauseButton = screen.getByTestId("pause-btn");
    fireEvent.click(pauseButton);

    expect(setIsActiveMock).toHaveBeenCalledWith(false);
    expect(audio.pause).toHaveBeenCalledTimes(1);
  });
});
