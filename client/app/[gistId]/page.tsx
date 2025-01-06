"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";

export default function getGist() {
  const { gistId } = useParams<{ gistId: string }>();
  const [code, setCode] = useState("");
  const getGist = async () => {
    const response = await axios.get(`http://localhost:4000/${gistId}`);
    if (!response.data.code) {
      setCode(response.data.msg);
    } else {
      setCode(response.data.code);
    }
  };

  useEffect(() => {
    getGist();
  }, []);
  return (
    <>
      <div>GistID: {gistId}</div>

      <Editor
        height="80vh"
        width="40vw"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={code}
      ></Editor>
    </>
  );
}
