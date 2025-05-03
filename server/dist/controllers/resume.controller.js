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
exports.resumeAnalyzer = void 0;
const extractors_1 = require("../utils/extractors");
const gemini_1 = require("../utils/gemini");
const resumeAnalyzer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { file } = req;
    if (!file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
    }
    const fileName = file.originalname.toLowerCase();
    if (!fileName.endsWith(".pdf") &&
        !fileName.endsWith(".docx") &&
        !fileName.endsWith(".txt")) {
        res.status(400).json({ error: "File must be PDF, DOCX, or TXT" });
        return;
    }
    try {
        let textContent = "";
        if (fileName.endsWith(".pdf")) {
            textContent = yield (0, extractors_1.extractTextFromPDF)(file.buffer);
        }
        else if (fileName.endsWith(".docx")) {
            textContent = yield (0, extractors_1.extractTextFromDocx)(file.buffer);
        }
        else if (fileName.endsWith(".txt")) {
            textContent = file.buffer.toString("utf-8");
        }
        const result = yield (0, gemini_1.analyzeResume)(textContent);
        res.json(result);
        return;
    }
    catch (err) {
        console.error("Error during analysis:", err.message);
        res.status(500).json({ error: err.message });
        return;
    }
});
exports.resumeAnalyzer = resumeAnalyzer;
