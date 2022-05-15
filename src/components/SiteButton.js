import React from "react";

const SiteButton = ({ name, clicked, icon }) => {
  return (
    <button className="flex group space-x-2" onClick={clicked}>
      {icon}
      <span className="text-blue-600 text-sm group-hover:text-blue-700">
        {name}
      </span>
    </button>
  );
};

export default SiteButton;
