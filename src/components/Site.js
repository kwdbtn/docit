import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FolderAddIcon,
  ShareIcon,
  TrashIcon,
  UploadIcon,
} from "@heroicons/react/solid";
import Datatable from "./Datatable";
import SiteButton from "./SiteButton";

const Site = ({ showModal }) => {
  const [site, setSite] = useState({});
  const [folders, setFolders] = useState([]);

  // url to get site details
  const getSiteUrl = "http://127.0.0.1:8000/api/sites/";
  const { id } = useParams();

  // url to get all sites
  const getFoldersUrl = "http://127.0.0.1:8000/api/folders/" + id;

  // information for modal
  const modalData = {
    name: "New folder",
    siteID: id,
  };

  useEffect(() => {
    // get site details
    const getSite = async () => {
      let response = await axios.get(getSiteUrl + id);
      console.log(response.data);
      setSite(response.data);
    };

    // get folders of site
    const getFolders = async () => {
      let response = await axios.get(getFoldersUrl);
      setFolders(response.data);
    };

    getSite();
    getFolders();
  }, [id]);

  return (
    <>
      <div className="mt-3 font-bold text-lg">{site.name}</div>
      <div className="flex mt-2 rounded-md bg-slate-300 p-1">
        <SiteButton
          name="New folder"
          clicked={(e) => showModal(modalData, e)}
          icon={
            <FolderAddIcon className="h-4 w-4 text-white group-hover:text-[#fad155]" />
          }
        />
        <span className="mx-4 border-r-2 border-r-white"></span>
        <SiteButton
          name="Upload file"
          clicked={(e) => showModal(modalData, e)}
          icon={
            <UploadIcon className="h-4 w-4 text-white group-hover:text-[#fad155]" />
          }
        />
        <span className="mx-4 border-r-2 border-r-white"></span>
        <SiteButton
          name="Share site"
          clicked={(e) => showModal(modalData, e)}
          icon={
            <ShareIcon className="h-4 w-4 text-white group-hover:text-[#fad155]" />
          }
        />
        <span className="mx-4 border-r-2 border-r-white"></span>
        <SiteButton
          name="Delete site"
          clicked={(e) => showModal(modalData, e)}
          icon={
            <TrashIcon className="h-4 w-4 text-white group-hover:text-red-600" />
          }
        />
      </div>

      <Datatable className="w-full" data={folders} />
    </>
  );
};

export default Site;
