import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FolderOpenIcon, PencilAltIcon } from "@heroicons/react/solid";

const SideMenu = ({ showModal }) => {
  const [sites, setSites] = useState([]);
  const getSitesUrl = "http://127.0.0.1:8000/api/sites";

  const [showEdit, setShowEdit] = useState(false);

  // modal information to send to modal
  const modalData = {
    name: "New site",
  };

  const mouseHoverEvent = (site, editState, e) => {
    // setShowEdit(editState);
    // console.log("The site name is ", site.name);
    // console.log("The e target value is ", e.target.value);
    // if (site.name === e.target) {
    //   console.log("They are the same");
    // }
  };

  const showEditButton = (showEdit) =>
    showEdit ? <PencilAltIcon className="h-3 w-3 text-blue-500 mx-auto" /> : "";

  useEffect(() => {
    // get all sites
    const getSites = async () => {
      const response = await axios.get(getSitesUrl);
      setSites(response.data);
    };

    getSites();
  }, [sites]);

  return (
    <div className="flex">
      <div className="m-10 w-60">
        <ul>
          {sites.map((site) => (
            <li
              key={site.id}
              className="p-2 hover:text-blue-500 text-sm cursor-pointer hover:border-l-2 hover:border-l-blue-500 text-md"
            >
              <NavLink
                to={`/sites/${site.id}`}
                // onMouseEnter={() => setShowEdit(true)}
                // onMouseLeave={() => setShowEdit(false)}
                onMouseEnter={(e) => mouseHoverEvent(site, true, e)}
                onMouseLeave={(e) => mouseHoverEvent(site, false, e)}
                className="flex justify-between"
              >
                <span>{site.name}</span>

                {showEditButton(showEdit)}
              </NavLink>
            </li>
          ))}

          <li className="p-3 hover:text-blue-500 cursor-pointer">
            <button
              className="flex group text-sm"
              onClick={(e) => {
                showModal(modalData, e);
              }}
            >
              <FolderOpenIcon className="h-5 w-5 pr-1 text-blue-500 group-hover:text-blue-500" />
              Create new site
            </button>
          </li>
        </ul>
      </div>
      <div className="border border-5 border-gray-200"></div>
    </div>
  );
};

export default SideMenu;
