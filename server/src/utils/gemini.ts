import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function analyzeResume(resumeText: string): Promise<{
  score: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  error?: string;
}> {
  try {
    const prompt = `
Analyze this resume for ATS (Applicant Tracking System) optimization. Provide:
1. A score out of 100
2. Key strengths
3. Areas for improvement
4. Suggested improvements.

All of these should be an array.

Resume:
${resumeText}

Format response as JSON with these keys: score, strengths, improvements, suggestions
  `.trim();

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: prompt,
    });
    
    if (!response || !response.text) {
      throw new Error("No response text from Gemini");
    }
    const textContent = response.text;
    const jsonMatch = textContent.match(/```json\s*([\s\S]*?)\s*```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : textContent;

    const result = JSON.parse(jsonStr);

    return {
      score: result?.score ?? 0,
      strengths: result?.strengths ?? [],
      improvements: result?.improvements ?? [],
      suggestions: result?.suggestions ?? [],
    };
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return {
      score: 0,
      strengths: [],
      improvements: [],
      suggestions: [],
    };
  }
}
