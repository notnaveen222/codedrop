"use client";
import Navbar from "@/components/Navbar";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function V2() {
  const [customId, setCustomId] = useState<string>("customid");
  const [code, setcode] = useState<string | undefined>("");
  const [dropId, setDropId] = useState("");
  // const [dropStatus, setDropStatus] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    setcode(value);
  };
  let timeout: ReturnType<typeof setTimeout>;
  const debounceEditorChange = (value: string | undefined) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      handleEditorChange(value);
    }, 1000);
  };

  const handleCreateGist = async () => {
    if (code != "") {
      try {
        //send code and custom ID in body //sent
        const response = await axios.post(
          /*"https://codedrop.onrender.com/generate"*/ `https://codedrop-backend.vercel.app/generate`,
          {
            code,
            customId,
          }
        );
        setDropId(response.data.id);
        // setDropStatus(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const options = {
    readOnly: false,
    minimap: { enabled: false },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomId(e.target.value);
  };

  return (
    <div className=" flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow ">
        <div className="text-white flex justify-center items-center flex-col gap-y-5  h-[100%]">
          <div className="flex flex-col gap-y-1 border border-white/30 rounded-lg overflow-hidden ">
            <div className=" text-lg sm:text-xl flex flex-col justify-start  p-2 px-4 ">
              <div className="">Create a drop to generate code link</div>
              <div className="block w-full h-[25px]">
                Link:{" "}
                <Link href={`/${dropId}`}>
                  <pre className="inline bg-[#1e1e1e] p-[2px] px-1 rounded-lg">
                    codedrop1.vercel.app/{customId}
                  </pre>
                </Link>
              </div>
            </div>
            <div className="border-y border-y-white/30 w-[95vw] md:w-[60vw] lg:w-[40vw]">
              <Editor
                className=""
                height="60vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={`// Enter your code\n`}
                onChange={debounceEditorChange}
                options={options}
              ></Editor>
            </div>
            <div className="pt-4 pb-3 px-4 flex justify-between">
              <input
                onChange={handleInputChange}
                type="text"
                className="bg-[#1E1E1E] px-3 border-2 border-white/50 focus:border-white rounded-lg focus:outline-none w-3/6 sm:w-fit focus:ring-0"
                placeholder="Enter custom id"
              />
              <button
                className="sm:text-lg hover:bg-white hover:text-black transition-all duration-200 ease-out border border-white p-2 rounded-lg"
                onClick={handleCreateGist}
              >
                Create Drop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
