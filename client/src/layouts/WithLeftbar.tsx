import Leftbar from "@components/Leftbar/Leftbar";
import React, { ReactNode } from "react";

interface WithLeftbarProps {
  children: ReactNode | string;
}

const WithLeftbar = ({ children }: WithLeftbarProps) => {
  return (
    <>
      <Leftbar />
      <main>{children}</main>
    </>
  );
};

export default WithLeftbar;
