import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ERoutes } from "types/routes/ERoutes";
import Item from "./Item";
import PeopleIcon from "@mui/icons-material/People";

export default {
  title: "Components/Leftbar/Item",
  component: Item,
  argTypes: {
    withIcon: { control: "boolean" }
  },
  args: {
    withIcon: true,
    primary: "Some random text",
    to: ERoutes.HOME
  }
} as ComponentMeta<typeof Item>;

const Template: ComponentStory<typeof Item> = ({ withIcon, ...args }) => {
  return <Item {...args} icon={withIcon ? <PeopleIcon /> : undefined} />;
};

export const Default = Template.bind({});
Default.args = {};
