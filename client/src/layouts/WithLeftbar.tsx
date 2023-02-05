import Leftbar from "components/Leftbar/Leftbar";
import { findMe } from "modules/User";
import React, { ReactNode } from "react";
import { useQuery } from "react-query";

interface WithLeftbarProps {
  children: ReactNode | string;
}

const WithLeftbar = ({ children }: WithLeftbarProps) => {
  const { data: user } = useQuery("findMe", () => findMe());

  return (
    <>
      <Leftbar user={user} />
      <main>{children}</main>
    </>
  );
};

export default WithLeftbar;
