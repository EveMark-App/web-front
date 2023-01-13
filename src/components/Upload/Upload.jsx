import React, { useState } from "react";
import "./upload.css";

export default function Upload({ setUrl }) {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setErrMsg("something went wrong!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("https://evemark.fun/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data.url);
          setUrl(data.url);
        });
      setFileInputState("");
      setErrMsg("");
      setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      setSuccessMsg("");
      setErrMsg("Something went wrong!");
    }
  };
  return (
    <div className="upload">
      <label className="file-upload">
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
      </label>
      <button className="btn" type="submit" onClick={handleSubmitFile}>
        Upload
      </button>
      <h5>
        {successMsg}
        {errMsg}
      </h5>
    </div>
  );
}
