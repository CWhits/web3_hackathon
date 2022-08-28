import React from "react";
import { RingLoader } from "react-spinners";

function LoadingIndicator({ className }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${className} py-40`}
    >
      <RingLoader size={24} color="#000" />
      <span>Loading</span>
    </div>
  );
}

export default LoadingIndicator;
