import axios from "axios";
import React, { useState } from "react";

function SiteModal({ modalData, closeModal }) {
  const siteUrl = "http://127.0.0.1:8000/api/sites/";
  const folderURl = "http://127.0.0.1:8000/api/folders/" + modalData.siteID;
  const [siteName, setSiteName] = useState("");

  const modalAction = async (e) => {
    e.preventDefault();
    console.log(siteName);

    try {
      if (modalData.name.toLowerCase() === "new site") {
        console.log("This is for the new site");
        let response = await axios.post(siteUrl, {
          site_name: siteName,
        });
        console.log(response.data);
      } else {
        console.log("This is for the new folder with ID ", modalData.siteID);
        let response = await axios.post(folderURl, {
          name: siteName,
          file_size: "0",
          file_type: "Folder",
        });
        console.log(response.data);
      }

      setSiteName("");
      closeModal({ name: "bleh" }, e);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSiteName = (e) => {
    setSiteName(e.target.value);
  };

  return (
    <div className="flex border-1 mx-auto mt-2">
      <div className="flex bg-blue-200 w-[500px] h-[170px] rounded-xl shadow-md">
        <form className="flex flex-col m-2 w-full" action="#">
          <div className="flex justify-between">
            <h1 className="text-lg font-bold mt-2">{modalData.name}</h1>
            <div className="mr-2 p-0">
              <button
                className="text-xl hover:font-bold"
                onClick={(e) => {
                  closeModal({ name: "bleh" }, e);
                }}
              >
                x
              </button>
            </div>
          </div>
          <input
            className="mt-2 p-3 rounded-md shadow-md"
            type="text"
            name="site_name"
            placeholder="e.g. Engineering"
            value={siteName}
            onChange={handleSiteName}
          />
          <div className="flex justify-end">
            <button
              onClick={modalAction}
              className="bg-blue-500 rounded-md w-20 p-2 m-2 hover:bg-blue-400 shadow-sm"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SiteModal;
