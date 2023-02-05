import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Footer from "./Footer";
import { withQueryClient } from "../../../../.storybook/decorators/withQueryClient";

export default {
  title: "Components/Leftbar/Footer",
  component: Footer,
  decorators: [withQueryClient]
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => {
  return <Footer />;
};

export const Default = Template.bind({});
Default.args = {};
