import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex w-full justify-between px-7 h-20 bg-black text-white mx-auto items-center border-b-4 border-b-blue-700">
      <h1 className="text-2xl font-bold">
        <Link to="/">DocIt</Link>
      </h1>
      <ul className="flex">
        <li className="p-4">A menu</li>
        <li className="p-4">Another menu</li>
      </ul>
    </div>
  );
};

export default Navbar;
