export default function Navbar() {
  return (
    <>
      <div className="flex h-[70px] justify-between p-4 px-6 sm:px-14">
        <div className="text-lg flex justify-center items-center">
          <div>
            <span className="font-bold">Code</span> Drop
          </div>
        </div>
        <div className="flex gap-6 sm:gap-10 justify-center items-center">
          <div className="line-through text-sm sm:text-lg font-medium cursor-pointer">
            All Codes
          </div>
          <div className="line-through cursor-pointer text-sm sm:text-lg ">
            Your Account
          </div>
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
