import React, { useEffect, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import List from "./List";
import { IUser } from "modules/User";
import { user } from "../../../../mocks/user";

interface ListProps {
  withUser: boolean;
}

export default {
  title: "Components/Leftbar/List",
  component: List,
  argTypes: {
    withUser: { control: "boolean" }
  },
  args: {
    withUser: true
  }
} as ComponentMeta<typeof List>;

const Template: ComponentStory<any> = (args: ListProps) => {
  const [mockedUser, setMockedUser] = useState<IUser>();

  useEffect(() => {
    setMockedUser(args.withUser ? user : undefined);
  }, [args.withUser]);

  return <List user={mockedUser} />;
};

export const Default = Template.bind({});
Default.args = {};
