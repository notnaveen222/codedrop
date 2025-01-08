"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";

export default function getGist() {
  const { gistId } = useParams<{ gistId: string }>();
  const [code, setCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copy to Clipboard");

  const getGist = async () => {
    const response = await axios.get(`https://codedrop.onrender.com/${gistId}`);
    if (!response.data.code) {
      setCode(response.data.msg);
    } else {
      setCode(response.data.code);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopyButtonText("Copied");
    setIsCopied(!isCopied);
    setTimeout(() => {
      setCopyButtonText("Copy to Clipboard");
      setIsCopied(!isCopied);
    }, 2000);
  };

  const options = {
    readOnly: false,
    minimap: { enabled: false },
  };

  useEffect(() => {
    getGist();
  }, []);
  return (
    <>
      <div className="flex">
        <div className="flex-col px-10 ">
          <div className="text-lg mb-3">GistID: {gistId}</div>

          <Editor
            height="80vh"
            width="40vw"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue={code}
            options={options}
          ></Editor>
        </div>
        <button
          onClick={handleCopy}
          className="self-start px-8 mt-10 border p-3 rounded-lg transition-all duration-150 ease-in-out hover:bg-white hover:text-black hover:border-black "
        >
          Copy
        </button>
      </div>
    </>
  );
}
