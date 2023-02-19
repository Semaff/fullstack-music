import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ERoutes } from "types/routes/ERoutes";
import { userItems } from "../../constants/userItems";
import Item from "./Item";

export default {
  title: "Components/Leftbar/Item",
  component: Item,
  argTypes: {
    primary: {
      control: {
        type: "text"
      }
    },
    to: {
      control: {
        type: "select",
        options: Object.values(ERoutes)
      }
    },
    icon: {
      control: {
        type: "object"
      }
    },
    onClick: {
      action: "clicked"
    }
  }
} as ComponentMeta<typeof Item>;

const Template: ComponentStory<typeof Item> = (args) => <Item {...args} />;

export const Default = Template.bind({});
Default.args = { ...userItems[0] };
