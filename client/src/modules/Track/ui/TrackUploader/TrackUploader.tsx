import FileUploader from "components/FileUploader/FileUploader";
import React, { Dispatch, SetStateAction } from "react";

interface TrackUploaderProps {
  track: File | undefined;
  setTrack: Dispatch<SetStateAction<File | undefined>>;
}

const TrackUploader = ({ track, setTrack }: TrackUploaderProps) => {
  return <FileUploader file={track} setFile={setTrack} accept="audio/*" />;
};

export default TrackUploader;
