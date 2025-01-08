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
  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `https://codedrop1.vercel.app/${dropId}`
    );
  };
  const options = {
    readOnly: false,
    minimap: { enabled: false },
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <div className="px-10">
          <div className="flex flex-1 min-w-[95%] max-w-[40vw]">
            <Editor
              className=""
              width="40vw"
              height="80vh"
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
          <div className="text-lg pl-10 pt-8 pb-6 sm:pb-0 sm:pt-0">
            {dropStatus ? `Drop ID: ${dropId}` : "Create a drop to generate ID"}
          </div>
          <Link href={`/${dropId}`}>
            <div className="pl-10 pr-5 pb-5 text-lg cursor-pointer break-words">
              {dropStatus ? `Link: https://codedrop1.vercel.app/${dropId}` : ""}
            </div>
          </Link>
          {dropStatus ? (
            <button
              className="border-white  ml-10 mb-5 border-2 p-2 rounded-lg"
              onClick={handleCopy}
            >
              Copy Link
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
