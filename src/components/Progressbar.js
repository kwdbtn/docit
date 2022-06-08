import React from "react";

const Progressbar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full">
      <div
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
        style="width: 50%"
      >
        {" "}
        {progress}
      </div>
    </div>
  );
};

export default Progressbar;
