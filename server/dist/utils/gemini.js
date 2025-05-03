"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeResume = analyzeResume;
const genai_1 = require("@google/genai");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new genai_1.GoogleGenAI({ apiKey: GEMINI_API_KEY });
function analyzeResume(resumeText) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const response = yield ai.models.generateContent({
            model: "gemini-2.0-flash-001",
            contents: prompt,
        });
        if (!response) {
            throw new Error("No response text from Gemini");
        }
        const result = response.text;
        console.log(response.text);
        return {
            score: (result === null || result === void 0 ? void 0 : result.score) || 0,
            strengths: (result === null || result === void 0 ? void 0 : result.strengths) || [],
            improvements: (result === null || result === void 0 ? void 0 : result.improvements) || [],
            suggestions: (result === null || result === void 0 ? void 0 : result.suggestions) || [],
        };
    });
}
