import { Copy, Download, FileText } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../store/store";

// Resume Analysis Component
const ResumeAnalysis = ({ analysisResult }: any) => {
  if (!analysisResult) return null;

  const { score, strengths, improvements, suggestions } = analysisResult;

  return (
    <div className="w-full bg-white p-6 max-h-screen overflow-auto rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        ATS Analysis Results
      </h2>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">ATS Score</h3>
          <span className="text-2xl font-bold">{score}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full ${
              score >= 70
                ? "bg-green-500"
                : score >= 40
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Key Strengths</h3>
        <ul className="list-disc pl-5 space-y-1">
          {Array.isArray(strengths) ? (
            strengths.map((strength, index) => (
              <li key={index} className="text-gray-700">
                {strength}
              </li>
            ))
          ) : (
            <li className="text-gray-700">{strengths}</li>
          )}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Areas for Improvement</h3>
        <ul className="list-disc pl-5 space-y-1">
          {Array.isArray(improvements) ? (
            improvements.map((improvement, index) => (
              <li key={index} className="text-gray-700">
                {improvement}
              </li>
            ))
          ) : (
            <li className="text-gray-700">{improvements}</li>
          )}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Suggestions</h3>
        <ul className="list-disc pl-5 space-y-1">
          {Array.isArray(suggestions) ? (
            suggestions.map((suggestion, index) => (
              <li key={index} className="text-gray-700">
                {suggestion}
              </li>
            ))
          ) : (
            <li className="text-gray-700">{suggestions}</li>
          )}
        </ul>
      </div>
    </div>
  );
};
const DocumentViewer = ({ file }: any) => {
  if (!file) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500 text-lg">No document selected</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="bg-gray-100 p-4 flex justify-between items-center border-b">
        <div className="flex items-center">
          <FileText className="text-blue-600 mr-2" size={20} />
          <span className="font-medium">{file.name}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-200 rounded-full" title="Copy">
            <Copy size={18} />
          </button>
          <button
            className="p-2 hover:bg-gray-200 rounded-full"
            title="Download"
          >
            <Download size={18} />
          </button>
        </div>
      </div>
      <div className="flex-grow p-6 overflow-auto">
        {/* This would be replaced with actual document content */}
        <iframe src={URL.createObjectURL(file)} className="w-full h-full" />
      </div>
    </div>
  );
};

export default function Analysis() {
  const resumeState = useSelector((state: RootState) => state.resumeReducer);
  const navigate = useNavigate();
  if (!resumeState.hasData) {
    setTimeout(() => navigate("/"), 2000);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-2xl font-bold">No resume data available</h1>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-6 h-screen">
        <div className="w-full lg:w-1/2 h-full flex flex-col">
          {resumeState.analytics && (
            <ResumeAnalysis analysisResult={resumeState.analytics} />
          )}
        </div>

        <div className="w-full lg:w-1/2 h-full">
          <DocumentViewer file={resumeState.file} />
        </div>
      </div>
    </div>
  );
}
