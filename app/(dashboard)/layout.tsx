import Navbar from "@/components/nav-bar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {" "}
      <Navbar />
      <div className="container  mx-auto">{children}</div>
    </div>
  );
};

export default layout;
