
import React from "react";
import { MutatingDots } from "react-loader-spinner";
import Logo from "./logo";
const FullPageLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center">
        <Logo width={170} height={170} />{" "}
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#9234EA"
          secondaryColor="#9234EA"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default FullPageLoader;
