import React, { useEffect, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Leftbar from "./Leftbar";
import { withQueryClient } from "../../../.storybook/decorators/withQueryClient";
import { IUser } from "modules/User";
import { user } from "../../../mocks/user";

interface LeftbarProps {
  withUser: boolean;
}

export default {
  title: "Components/Leftbar",
  component: Leftbar,
  argTypes: {
    withUser: { control: "boolean" }
  },
  args: {
    withUser: true
  },
  decorators: [withQueryClient]
} as ComponentMeta<typeof Leftbar>;

const Template: ComponentStory<any> = (args: LeftbarProps) => {
  const [mockedUser, setMockedUser] = useState<IUser>();

  useEffect(() => {
    setMockedUser(args.withUser ? user : undefined);
  }, [args.withUser]);

  return <Leftbar user={mockedUser} />;
};

export const Default = Template.bind({});
Default.args = {};
