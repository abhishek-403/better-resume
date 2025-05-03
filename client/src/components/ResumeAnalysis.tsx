

const ResumeAnalysis = ({ analysisResult }: any) => {
  if (!analysisResult) return null;

  const { score, strengths, improvements, suggestions } = analysisResult;

  return (
    <div className="w-full max-w-2xl mx-auto  bg-white p-6 max-h-screen overflow-auto rounded-lg shadow-md">
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

export default ResumeAnalysis;
