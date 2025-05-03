type Props = {};
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import FileUpload from "../components/FIleUpload";
import { analyzeResume } from "../services/api";
import { addResume } from "../store/slices/resume-data";
export default function Home({}: Props) {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleFileUpload = async () => {
    if (!resumeFile) {
      setError("Please select a file to upload.");
      return;
    }
    try {
      setLoading(true);
      const result = await analyzeResume(resumeFile);
      if (result.status === "error") {
        setError(result.result);
        return;
      }
      setAnalysisResult(result);
      dispatch(
        addResume({
          analytics: result.result,
          file: resumeFile,
          hasData: true,
        })
      );
      nav("/analysis");
    } catch (err) {
      setError("Error analyzing resume. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen px-4">
      {!analysisResult && !loading && (
        <FileUpload
          selectedFile={resumeFile}
          setSelectedFile={setResumeFile}
          onFileUpload={handleFileUpload}
          isLoading={loading}
        />
      )}

      {loading && (
        <div className="flex-grow h-screen flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-sm text-gray-500">This may take a few moments</p>
        </div>
      )}

      {error && (
        <div className="w-full max-w-md mx-auto text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
