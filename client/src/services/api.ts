import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const analyzeResume = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);;
  try {
    const response = await axios.post(`${API_URL}/resume/analyze`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 60000,
    });
    return response.data;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
};
