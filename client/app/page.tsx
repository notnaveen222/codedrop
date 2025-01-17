"use client";
import Navbar from "@/components/Navbar";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Notification from "@/components/Notification";

//To Dos
//Change to Language Independent

export default function V2() {
  const [customId, setCustomId] = useState<string>("customid");
  const [code, setcode] = useState<string | undefined>("");
  const [dropStatus, setDropStatus] = useState(false);
  const [loading, setLoading] = useState(false); //for showing loading message
  const [NotificationMessage, setNotificationMessage] = useState<string>(
    "Drop Created, Use the url to get the code"
  );

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

  const showNotification = () => {
    setLoading(false);
    setDropStatus(true);
    setTimeout(() => {
      setDropStatus(false);
    }, 2000);
  };

  const handleCreateGist = async () => {
    if (code != "") {
      try {
        setLoading(true);
        //send code and custom ID in body //sent
        const response = await axios.post(
          /*"https://codedrop.onrender.com/generate"*/ `https://codedrop-backend.vercel.app/generate`,
          {
            code,
            customId,
          }
        );
        if (response.data.dropCreatedStatus) {
          setCustomId(response.data.customId);
          setNotificationMessage(response.data.msg);
          showNotification();
        } else {
          setNotificationMessage(response.data.msg);
          showNotification();
        }
      } catch (error) {
        setNotificationMessage(
          "Error Creating Drop ID (Client Error), Try again later!"
        );
        console.log(error);
        showNotification();
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
    <>
      <Notification dropStatus={loading} message="Loading" />
      <Notification dropStatus={dropStatus} message={NotificationMessage} />
      <div className=" flex flex-col h-screen">
        <Navbar />
        <div className="flex-grow ">
          <div className="text-white flex justify-center items-center flex-col gap-y-5  h-[100%]">
            <div className="flex flex-col gap-y-1 w-[95%] sm:w-fit border border-white/30 rounded-lg overflow-hidden ">
              <div className="text-lg sm:text-xl flex flex-col justify-start  p-2 px-4 ">
                <div className="">Create a drop to generate code link</div>
                <div className="text-base sm:text-lg block  h-[25px]">
                  Link:{" "}
                  <Link href={`/${customId}`}>
                    <pre className="text-base sm:text-xl inline bg-[#1e1e1e] p-[2px] px-1 rounded-lg">
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
                  defaultValue={`// Enter your code, Dont mind errors shown in code\n`}
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
    </>
  );
}
