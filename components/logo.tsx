import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="relative z-20 flex items-center justify-center text-lg font-medium">
      <Image
        src={"/Images/Logo.svg"}
        width={200}
        height={200}
        alt="logo-image"
      />
    </div>
  );
};

export default Logo;
