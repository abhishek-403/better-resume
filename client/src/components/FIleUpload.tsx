import { ChevronDown, FileText, Upload } from "lucide-react";
import { useRef, useState } from "react";

const FileUpload = ({
  onFileUpload,
  setSelectedFile,
  selectedFile,
}: any) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: any) => {
    setSelectedFile(file);
  };

  const triggerFileInput = () => {
    if (!fileInputRef.current) return;
    (fileInputRef.current as any).click();
  };

  const handleFileInputChange = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Improve your resume with AI feedback
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Upload your resume and get instant AI-powered feedback to help you
          land your dream job.
        </p>
      </div>

      {/* Big Dropzone Area */}
      <div
        className={`w-full max-w-2xl mx-auto border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-200 ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : selectedFile
            ? "border-green-500 bg-green-50"
            : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50"
        }`}
        onClick={triggerFileInput}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileInputChange}
          accept=".pdf,.doc,.docx"
        />

        <div className="flex flex-col items-center justify-center py-6">
          {selectedFile ? (
            <>
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <FileText size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-1">
                {selectedFile.name}
              </h3>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB · Click to
                change
              </p>
            </>
          ) : (
            <>
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Upload size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-1">
                Drop your resume here
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Supports PDF, DOC, DOCX formats up to 10MB
              </p>
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <span>Click to browse files</span>
                <ChevronDown size={16} />
              </div>
            </>
          )}
        </div>
      </div>

      {selectedFile && (
        <button
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-colors duration-200"
          onClick={onFileUpload}
        >
          Analyze My Resume
        </button>
      )}
    </div>
  );
};

export default FileUpload;
