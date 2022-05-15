import React from "react";

const Breadcrumb = () => {
  return (
    <>
      <nav className="rounded-md w-full text-sm">
        <ol className="list-reset flex">
          <li>
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Home
            </a>
          </li>
          <li>
            <span className="text-gray-500 mx-2">/</span>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Library
            </a>
          </li>
          <li>
            <span className="text-gray-500 mx-2">/</span>
          </li>
          <li className="text-gray-500">Data</li>
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
