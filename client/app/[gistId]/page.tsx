"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import Navbar from "@/components/Navbar";

export default function GetGist() {
  const { gistId } = useParams<{ gistId: string }>();
  const [code, setCode] = useState("//Loading your code");

  const getGist = async () => {
    try {
      const response = await axios.get(
        //`https://codedrop.onrender.com/${gistId}`
        `https://codedrop-backend.vercel.app/${gistId}`
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
      <div className=" flex flex-col h-screen">
        <Navbar />
        <div className="flex-grow ">
          <div className="text-white flex justify-center items-center flex-col gap-y-5  h-[100%]">
            <div className="flex flex-col gap-y-1 border border-white/30 rounded-lg overflow-hidden ">
              <div className=" text-lg sm:text-xl flex flex-col justify-start  p-2 px-4 ">
                <div className="font-semibold">Code</div>
              </div>
              <div className="border-y border-y-white/30 w-[95vw] md:w-[60vw] lg:w-[40vw]">
                <Editor
                  className=""
                  height="60vh"
                  theme="vs-dark"
                  defaultLanguage="javascript"
                  value={code}
                  options={options}
                ></Editor>
              </div>
              <div className="pt-4 pb-3 px-4 flex justify-end">
                <button
                  onClick={handleCopy}
                  className="sm:text-lg hover:bg-white hover:text-black transition-all duration-200 ease-out border border-white px-2 py-1 rounded-lg"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex">
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
      </div> */}
    </>
  );
}
