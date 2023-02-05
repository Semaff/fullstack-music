import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Custom500Page from "./index.page";

export default {
  title: "Pages/500",
  component: Custom500Page
} as ComponentMeta<typeof Custom500Page>;

const Template: ComponentStory<typeof Custom500Page> = () => <Custom500Page />;

export const Default = Template.bind({});
Default.args = {};
