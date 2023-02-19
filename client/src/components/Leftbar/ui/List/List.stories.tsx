import { ComponentMeta, ComponentStory } from "@storybook/react";
import { userItems } from "../../constants/userItems";
import { profileUserItems } from "../../constants/profileUserItems";
import List from "./List";

export default {
  component: List,
  title: "Components/Leftbar/List",
  argTypes: {
    items: {
      control: {
        type: "array",
        defaultValue: userItems
      }
    }
  }
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => <List {...args} />;

export const UserItems = Template.bind({});
UserItems.args = {
  items: userItems
};

export const ProfileUserItems = Template.bind({});
ProfileUserItems.args = {
  items: profileUserItems
};
