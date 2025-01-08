"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";

export default function GetGist() {
  const { gistId } = useParams<{ gistId: string }>();
  const [code, setCode] = useState("//Loading your code");

  const getGist = async () => {
    try {
      const response = await axios.get(
        `https://codedrop.onrender.com/${gistId}`
      );

      if (!response.data.code) {
        setCode(response.data.msg);
      } else {
        setCode(response.data.code);
      }
    } catch (error) {
      console.error("Error fetching gist:", error);
      setCode("Error loading code");
    }
  };

  useEffect(() => {
    getGist();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
  };

  const options = {
    readOnly: false,
    minimap: { enabled: false },
  };

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
            value={code}
            options={options}
          />
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
