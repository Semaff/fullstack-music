import React, { Dispatch, SetStateAction } from "react";
import FileUploader from "./FileUploader";

interface TrackUploaderProps {
  track: File | undefined;
  setTrack: (file?: File) => void | Dispatch<SetStateAction<File | undefined>>;
}

const TrackUploader = ({ track, setTrack }: TrackUploaderProps) => {
  return (
    <>
      <FileUploader file={track} setFile={setTrack} accept="audio/*" />
    </>
  );
};

export default TrackUploader;
