import React from "react";
import Image from "next/image";

const Logo = ({ width, height }: { width: number; height: number }) => {
  return (
    <div className="relative z-20 flex items-center justify-center text-lg font-medium">
      <Image
        src={"/Images/Logo.svg"}
        width={width}
        height={height}
        alt="logo-image"
      />
    </div>
  );
};

export default Logo;
