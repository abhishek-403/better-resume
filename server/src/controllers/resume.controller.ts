import { type Response } from "express";
import { extractTextFromDocx, extractTextFromPDF } from "../utils/extractors";
import { analyzeResume } from "../utils/gemini";
export const resumeAnalyzer = async (req: any, res: Response) => {
  const { file } = req;
  if (!file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const fileName = file.originalname.toLowerCase();

  if (
    !fileName.endsWith(".pdf") &&
    !fileName.endsWith(".docx") &&
    !fileName.endsWith(".txt")
  ) {
    res.status(400).json({ error: "File must be PDF, DOCX, or TXT" });
    return;
  }

  try {
    let textContent = "";

    if (fileName.endsWith(".pdf")) {
      textContent = await extractTextFromPDF(file.buffer);
    } else if (fileName.endsWith(".docx")) {
      textContent = await extractTextFromDocx(file.buffer);
    } else if (fileName.endsWith(".txt")) {
      textContent = file.buffer.toString("utf-8");
    }

    const result = await analyzeResume(textContent);
    res.json(result);
    return;
  } catch (err: any) {
    console.error("Error during analysis:", err.message);
    res.status(500).json({ error: err.message });
    return;
  }
};
