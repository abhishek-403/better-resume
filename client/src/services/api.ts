"use client";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const analyzeResume = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log("Form data:", "heelllo");
  try {
    const response = await axios.post(`${API_URL}/resume/analyze`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 60000,
    });
    console.log("Response from server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
};
