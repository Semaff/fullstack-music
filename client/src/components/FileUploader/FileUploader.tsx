import React, { ChangeEvent, Dispatch, InputHTMLAttributes, SetStateAction, useRef } from "react";
import { TextField, Button } from "@mui/material";

interface FileUploaderProps extends InputHTMLAttributes<HTMLInputElement> {
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
}

const FileUploader = ({ file, setFile, ...props }: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button onClick={() => inputRef.current?.click()}>{file ? file.name : 'Upload File'}</Button>

      <TextField
        sx={{ display: "none" }}
        inputRef={inputRef}
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0])}
        inputProps={{ ...props }}
      />
    </>
  );
};

export default FileUploader;
