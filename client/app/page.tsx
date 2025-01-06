"use client";

import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [code, setcode] = useState<string | undefined>("");

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
      } catch (error) {
        console.log(error);
      }
    }
  };
  let timeout: ReturnType<typeof setTimeout>;
  const debounceEditorChange = (value: string | undefined) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      handleEditorChange(value);
    }, 1000);
  };
  return (
    <>
      <div className="p-5 text-2xl ">Code Drop</div>
      <div className="p-5 ">
        <Editor
          height="80vh"
          width="40vw"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="// Enter your code"
          onChange={debounceEditorChange}
        ></Editor>
      </div>
      <button
        className="border-white ml-5 border-2 p-2 rounded-lg"
        onClick={handleCreateGist}
      >
        Create Gist
      </button>
    </>
  );
}
