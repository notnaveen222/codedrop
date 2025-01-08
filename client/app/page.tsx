"use client";

import { Editor } from "@monaco-editor/react";
import { useState } from "react";

import axios from "axios";

export default function Home() {
  const [code, setcode] = useState<string | undefined>("");
  const [dropId, setDropId] = useState("Create a drop to generate ID");
  const [dropUrl, setDropUrl] = useState("");
  const []; //make dropID here and for text use conditional css

  const handleEditorChange = (value: string | undefined) => {
    setcode(value);
  };

  const handleCreateGist = async () => {
    if (code != "") {
      try {
        const response = await axios.post("http://localhost:4000/generate", {
          code,
        });
        console.log(response.data.id);
        setDropId("Here is your Drop ID: " + response.data.id);
        setDropUrl("Link: http://localhost:3000/" + response.data.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOpenLink = () => {
    window.open(dropUrl, "_blank", "noopener,noreferrer");
  };

  let timeout: ReturnType<typeof setTimeout>;
  const debounceEditorChange = (value: string | undefined) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      handleEditorChange(value);
    }, 1000);
  };
  const options = {
    readOnly: false,
    minimap: { enabled: false },
  };

  return (
    <>
      <div className="flex">
        <div className="px-10">
          <div className="">
            <Editor
              height="80vh"
              width="40vw"
              theme="vs-dark"
              defaultLanguage="javascript"
              defaultValue="// Enter your code"
              onChange={debounceEditorChange}
              options={options}
            ></Editor>
          </div>
          <button
            className="border-white mt-5  border-2 p-2 rounded-lg"
            onClick={handleCreateGist}
          >
            Create Drop
          </button>
        </div>
        <div className="flex-col">
          <div className="text-lg">{dropId}</div>
          <div className="text-lg cursor-pointer" onClick={handleOpenLink}>
            {dropUrl}
          </div>
        </div>
      </div>
    </>
  );
}
