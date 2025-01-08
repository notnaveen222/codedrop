"use client";

import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [code, setcode] = useState<string | undefined>("");
  const [dropStatus, setDropStatus] = useState(false);
  const [dropId, setDropId] = useState("");
  //make dropID here and for text use conditional css

  const handleEditorChange = (value: string | undefined) => {
    setcode(value);
  };

  const handleCreateGist = async () => {
    if (code != "") {
      try {
        const response = await axios.post(
          "https://codedrop.onrender.com/generate",
          {
            code,
          }
        );
        console.log(response.data.id);
        setDropId(response.data.id);
        setDropStatus(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const handleOpenLink = () => {
  //   window.open(dropUrl, "_blank", "noopener,noreferrer");
  // };

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
              defaultValue={`// Enter your code\n`}
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
          <div className="text-lg">
            {dropStatus ? `Drop ID: ${dropId}` : "Create a drop to generate ID"}
          </div>
          <Link href={`/${dropId}`}>
            <div className="text-lg cursor-pointer">
              {dropStatus ? `Link: http://localhost:3000/${dropId}` : ""}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
