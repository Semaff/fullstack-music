import React, { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import { TextField, Button } from "@mui/material";

interface FileUploaderProps {
  file: File | undefined;
  setFile: (file?: File) => void | Dispatch<SetStateAction<File | undefined>>;
  accept?: string;
}

const FileUploader = ({ file, setFile, accept }: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button onClick={() => inputRef.current?.click()}>{file ? file.name : "Upload File"}</Button>

      <TextField
        sx={{ display: "none" }}
        inputRef={inputRef}
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0])}
        inputProps={{
          accept
        }}
      />
    </>
  );
};

export default FileUploader;
