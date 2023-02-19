import React, { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import { TextField, Button, TextFieldProps } from "@mui/material";

type FileUploaderProps = TextFieldProps & {
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
};

const FileUploader = ({ file, setFile, label = "Upload File", ...props }: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);
  };

  return (
    <>
      <Button onClick={handleClick}>{file ? file.name : label}</Button>
      <TextField
        label="File input"
        sx={{ display: "none" }}
        type="file"
        inputRef={inputRef}
        onChange={handleChange}
        {...props}
      />
    </>
  );
};

export default FileUploader;
