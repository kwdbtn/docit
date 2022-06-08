import React, { useEffect, useState } from "react";
import {
  CheckIcon,
  DocumentIcon,
  DocumentTextIcon,
  FolderIcon,
  PencilAltIcon,
  PhotographIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const Datatable = ({ data }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const searchData = (searchValue) => {
    setSearchInput(searchValue.trim());

    if (searchInput !== "") {
      console.log("Not empty with ", searchInput.length);
      const filteredResults = data.filter((item) => {
        // get values from obect (Object.values) and
        // convert values of returned object to string lowercases and compare
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredData(filteredResults);
    } else {
      console.log("It's empty");
      setFilteredData(data);
    }
  };

  const getItemFileIcon = (item) => {
    // images
    if (item.file_type.includes("image")) {
      return <PhotographIcon className="h-4 w-4 text-blue-500" />;

      // pdf
    } else if (item.file_type.includes("pdf")) {
      return <DocumentIcon className="h-4 w-4 text-red-500" />;

      // word docs
    } else if (
      item.file_type.includes("wordprocessing") ||
      item.file_type.includes("msword")
    ) {
      return <DocumentTextIcon className="h-4 w-4 text-blue-700" />;

      // excel docs
    } else if (item.file_type.includes("spreadsheet")) {
      return <DocumentTextIcon className="h-4 w-4 text-green-700" />;

      // folders
    } else {
      return <FolderIcon className="h-4 w-4 text-[#F8D775]" />;
    }
  };

  return (
    <div className="mt-5">
      <div className="flex justify-end">
        <input
          className="border-b-2 border-slate-400 mb-4 focus:outline-none text-sm"
          type="text"
          placeholder="I am looking for..."
          onChange={(e) => searchData(e.target.value)}
        />
      </div>
      <table className="table-auto w-full">
        <thead className="bg-slate-300">
          <tr className="text-sm text-left font-medium text-gray-900 px-6 py-4">
            <th className="px-3 border-r-2 border-r-white">
              <CheckIcon className="h-3 w-3 text-gray-900" />
            </th>
            <th className="border-r-2 border-r-white">Name</th>
            <th className="border-r-2 border-r-white">Created by</th>
            <th className="border-r-2 border-r-white">Created at</th>
            <th className="border-r-2 border-r-white">Size</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-left hover:bg-blue-200">
              <td className="px-3 w-[1%]">{getItemFileIcon(item)}</td>
              <td className="py-1 whitespace-nowrap text-sm font-normal text-gray-900 w-[40%]">
                {<Link to="">{item.name}</Link>}
              </td>
              <td className="py-2 whitespace-nowrap text-sm font-normal text-gray-900">
                Sosa
              </td>
              <td className="py-2 whitespace-nowrap text-sm font-normal text-gray-900">
                {item.created_at}
              </td>
              <td className="py-2 whitespace-nowrap text-sm font-normal text-gray-900">
                {item.file_size ? item.file_size : "..."}bytes
              </td>
              <td className="flex py-2 whitespace-nowrap text-sm justify-around">
                <ShareIcon className="h-4 w-4 text-gray-500 hover:text-blue-600 cursor-pointer" />
                <PencilAltIcon className="h-4 w-4 text-gray-500 hover:text-blue-600 cursor-pointer" />
                <TrashIcon className="h-4 w-4 text-gray-500 hover:text-red-600 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right text-sm text-gray-500">
        {data.length} Item(s)
      </div>
    </div>
  );
};

export default Datatable;
