import { track } from "mocks/tracks";

export const mockedStore = {
  track,
  currentPlaylist: null,
  isActive: false,
  volume: 50,
  time: 10,
  duration: 120,
  setTrack: jest.fn(),
  setCurrentPlaylist: jest.fn(),
  setIsActive: jest.fn(),
  setVolume: jest.fn(),
  setTime: jest.fn(),
  setDuration: jest.fn()
};
