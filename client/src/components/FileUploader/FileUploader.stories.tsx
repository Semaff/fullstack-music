import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FileUploader from "./FileUploader";

export default {
  title: "Components/FileUploader",
  component: FileUploader
} as ComponentMeta<typeof FileUploader>;

const Template: ComponentStory<typeof FileUploader> = () => {
  const [file, setFile] = useState<File>();
  return <FileUploader file={file} setFile={setFile} />;
};

export const Default = Template.bind({});
Default.args = {};
