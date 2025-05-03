"use client";
import { useState } from "react";

const FileUpload = ({ onFileUpload, isLoading }: any) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e: any) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        ATS Resume Scanner
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Upload your resume (PDF, DOCX, or TXT)
          </label>
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!file || isLoading}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
            !file || isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
