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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTextFromPDF = extractTextFromPDF;
exports.extractTextFromDocx = extractTextFromDocx;
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const mammoth_1 = __importDefault(require("mammoth"));
function extractTextFromPDF(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, pdf_parse_1.default)(buffer);
            return data.text;
        }
        catch (error) {
            console.error("Error extracting text from PDF:", error);
            return "";
        }
    });
}
function extractTextFromDocx(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield mammoth_1.default.extractRawText({ buffer });
            return result.value;
        }
        catch (error) {
            console.error("Error extracting text from DOCX:", error);
            return "";
        }
    });
}
