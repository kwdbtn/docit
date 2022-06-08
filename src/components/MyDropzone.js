import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  marginTop: "5px",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const MyDropzone = ({ siteID, refreshDataTable }) => {
  const [goodFiles, setGoodFiles] = useState([]);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    isDragActive,
  } = useDropzone({
    accept: {
      "image/*": [],
      "application/pdf": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
    onDrop: (acceptedFiles) => {
      setGoodFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  // save uploaded file
  const saveFile = (file) => {
    let response = axios.post(`http://127.0.0.1:8000/api/folders/${siteID}`, {
      name: file.name,
      file_size: file.size,
      file_type: file.type,
    });

    // set value that will be used to update datatable
    refreshDataTable(file.name);

    console.log("File is", response.data);
  };

  // loop through files
  useEffect(() => {
    goodFiles.map((file) => {
      saveFile(file);
    });
  }, [goodFiles]);

  console.log("The size is ", goodFiles.length);

  const files = goodFiles.map((file) => (
    <li key={file.path}>
      <span className="text-blue-600 text-sm">
        {">"} {file.name} uploaded successfully
      </span>
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <aside>
        <ol>{files}</ol>
      </aside>
    </section>
  );
};
export default MyDropzone;
