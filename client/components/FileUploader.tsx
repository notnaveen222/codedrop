import { useState } from "react";

export default function FileUploader({
  setCode,
}: {
  setCode: (content: string | ArrayBuffer | null) => void;
}) {
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
    ""
  );
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setFileContent(e.target.result);
          setCode(e.target.result);
        }
        reader.readAsText(file);
      };
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div>
        <label
          htmlFor="file-uploader"
          className="inline-block cursor-pointer rounded-lg bg-gray-500 px-3 py-1 text-white shadow-md hover:bg-blue-700 text-lg"
        >
          Upload File
        </label>
        <input
          type="file"
          onChange={handleFileUpload}
          id="file-uploader"
          className="hidden"
        />
      </div>
    </div>
  );
}
