import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Upper from "./Upper";

export default {
  title: "Components/Leftbar/Upper",
  component: Upper
} as ComponentMeta<typeof Upper>;

const Template: ComponentStory<typeof Upper> = () => {
  const [, setIsActive] = useState(false);
  return <Upper setIsActive={setIsActive} />;
};

export const Default = Template.bind({});
Default.args = {};
