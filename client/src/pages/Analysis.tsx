import { Copy, Download, FileText } from "lucide-react";

// Resume Analysis Component
const ResumeAnalysis = ({ analysisResult }:any) => {
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
const DocumentViewer = ({ file }:any) => {
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
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded w-5/6"></div>
          <div className="h-6 bg-gray-200 rounded w-3/5"></div>
          <div className="h-6 bg-gray-200 rounded w-4/5"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          <div className="h-6 bg-gray-200 rounded w-4/6"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded w-5/6"></div>
          <div className="h-6 bg-gray-200 rounded w-3/5"></div>
          <div className="h-6 bg-gray-200 rounded w-4/5"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};

export default function SplitViewResumePage({ file, analysisResult }: any) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
 
        <div className="w-full lg:w-1/2 h-full flex flex-col">
          <div className="flex-grow flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <h3 className="text-xl font-medium mb-2">
              Analyzing your resume...
            </h3>
            <p className="text-sm text-gray-500">This may take a few moments</p>
          </div>

          {analysisResult && <ResumeAnalysis analysisResult={analysisResult} />}
        </div>

        <div className="w-full lg:w-1/2 h-full">
          <DocumentViewer file={file} />
        </div>
      </div>
    </div>
  );
}
