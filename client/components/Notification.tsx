export default function Notification({
  dropStatus,
  message,
}: {
  dropStatus: boolean;
  message: string;
}) {
  return (
    <div
      className={`absolute w-screen bg-transparent flex justify-center transition-all duration-200 ease-in-out ${
        dropStatus ? "top-10" : "-top-16"
      }`}
    >
      <div
        className={`rounded-lg  bg-white text-black p-3 text-lg ${
          dropStatus ? "top-10" : "-top-16"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
