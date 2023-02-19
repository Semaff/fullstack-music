import { ComponentStory, ComponentMeta } from "@storybook/react";
import { user } from "mocks/user";
import { withQueryClient } from "@storybook/decorators/withQueryClient";
import Leftbar from "./Leftbar";

export default {
  title: "Components/Leftbar",
  component: Leftbar,
  decorators: [withQueryClient]
} as ComponentMeta<typeof Leftbar>;

const Template: ComponentStory<typeof Leftbar> = (args) => {
  return <Leftbar {...args} />;
};

export const Mobile = Template.bind({});
Mobile.args = { user };
Mobile.parameters = {
  viewport: {
    defaultViewport: "mobile1"
  }
};

export const Desktop = Template.bind({});
Desktop.args = { user };
Desktop.parameters = {
  viewport: {
    defaultViewport: "desktop"
  }
};
