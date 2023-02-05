import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withQueryClient } from "../../../.storybook/decorators/withQueryClient";
import UploadPage from "./index.page";

export default {
  title: "Pages/Upload",
  component: UploadPage,
  decorators: [withQueryClient]
} as ComponentMeta<typeof UploadPage>;

const Template: ComponentStory<typeof UploadPage> = () => <UploadPage />;

export const Default = Template.bind({});
Default.args = {};
