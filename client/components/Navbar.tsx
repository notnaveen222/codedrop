import Image from "next/image";
import userIcon from "@/public/userIcon2.png";

export default function Navbar() {
  return (
    <>
      <div className="flex h-[70px] justify-between p-4 px-14">
        <div className="text-xl">
          <span className="font-bold">Code</span> Drop
        </div>
        <div className="flex gap-10 justify-center items-center">
          <div className="text-lg font-medium cursor-pointer">All Codes</div>
          <div className="cursor-pointer text-lg ">Your Account</div>
        </div>
      </div>
    </>
  );
}

{
  /* <Image
  className="bg-white/90 h-10 w-10 aspect-square cursor-pointer p-1 rounded-full"
  src={userIcon}
  alt="user icon"
></Image> */
}
