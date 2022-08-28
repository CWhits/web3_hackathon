import React from "react";
import { RingLoader } from "react-spinners";

function StatusModal({ status }) {
  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center fixed z-50 inset-0 outline-none focus:outline-none p-6">
        {/*content*/}
        <div className="flex flex-col justify-center items-center border border-gray-200 rounded-lg px-8 py-16">
          <RingLoader size={20} color="#fff" />
          <div className="text-center font-bold text-gray-200 my-4">
            {status}
          </div>
        </div>
      </div>
      <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
    </React.Fragment>
  );
}

export default StatusModal;
