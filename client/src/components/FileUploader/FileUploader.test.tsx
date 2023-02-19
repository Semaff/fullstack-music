import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FileUploader from "./FileUploader";

describe("FileUploader", () => {
  const mockSetFile = jest.fn();

  beforeEach(() => {
    mockSetFile.mockClear();
  });

  it('renders the "Upload File" button', () => {
    render(<FileUploader file={undefined} setFile={mockSetFile} />);
    const uploadButton = screen.getByRole("button", { name: /upload file/i });
    expect(uploadButton).toBeInTheDocument();
  });

  it("renders the file name when a file is selected", () => {
    const mockFile = new File(["(⌐□_□)"], "mockfile.jpg", { type: "image/jpeg" });
    render(<FileUploader file={mockFile} setFile={mockSetFile} />);
    const fileName = screen.getByText("mockfile.jpg");
    expect(fileName).toBeInTheDocument();
  });

  it('opens the file input when the "Upload File" button is clicked', () => {
    render(<FileUploader file={undefined} setFile={mockSetFile} />);
    const uploadButton = screen.getByRole("button", { name: /upload file/i });
    fireEvent.click(uploadButton);
    const fileInput = screen.getByLabelText("File input");
    expect(fileInput).toBeInTheDocument();
  });

  it("calls the setFile function with the selected file when a file is uploaded", () => {
    const mockFile = new File(["(⌐□_□)"], "mockfile.jpg", { type: "image/jpeg" });
    render(<FileUploader file={undefined} setFile={mockSetFile} />);
    const uploadButton = screen.getByRole("button", { name: /upload file/i });
    fireEvent.click(uploadButton);
    const fileInput = screen.getByLabelText("File input");
    fireEvent.change(fileInput, { target: { files: [mockFile] } });
    expect(mockSetFile).toHaveBeenCalledWith(mockFile);
  });
});
