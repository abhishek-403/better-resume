import pdf from "pdf-parse";

import mammoth from "mammoth";
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    return "";
  }
}

export async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error("Error extracting text from DOCX:", error);
    return "";
  }
}
