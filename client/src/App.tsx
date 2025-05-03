import { useState } from "react";
import FileUpload from "./components/FIleUpload";
import ResumeAnalysis from "./components/ResumeAnalysis";
import { analyzeResume } from "./services/api";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleFileUpload = async (file: any) => {
    setLoading(true);
    setError(null);

    try {
      const result = await analyzeResume(file);
      setAnalysisResult(result);
    } catch (err) {
      setError("Error analyzing resume. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <FileUpload onFileUpload={handleFileUpload} isLoading={loading} />

      {loading && (
        <div className="w-full max-w-md mx-auto mt-6 text-center">
          <p className="text-gray-700">Analyzing your resume...</p>
        </div>
      )}

      {error && (
        <div className="w-full max-w-md mx-auto mt-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {analysisResult && <ResumeAnalysis analysisResult={analysisResult} />}
    </div>
  );
}
