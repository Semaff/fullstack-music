import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FileUploader from "./FileUploader";

export default {
  title: "FileUploader",
  component: FileUploader,
  argTypes: {
    onChange: { action: "onChange" }
  }
} as ComponentMeta<typeof FileUploader>;

const Template: ComponentStory<typeof FileUploader> = (args) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  return <FileUploader {...args} file={file} setFile={setFile} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Choose a file",
  fullWidth: true
};
