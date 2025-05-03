



from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from ..utils.gemini import analyze_resume
import fitz  # PyMuPDF
import docx
import io

router = APIRouter()

def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        with fitz.open(stream=file_bytes, filetype="pdf") as doc:
            text = ""
            for page in doc:
                text += page.get_text()
        return text
    except Exception as e:
        raise RuntimeError(f"Failed to extract PDF text: {e}")

def extract_text_from_docx(file_bytes: bytes) -> str:
    try:
        doc = docx.Document(io.BytesIO(file_bytes))
        return "\n".join([para.text for para in doc.paragraphs])
    except Exception as e:
        raise RuntimeError(f"Failed to extract DOCX text: {e}")

@router.post("/analyze")
async def analyze_resume_endpoint(file: UploadFile = File(...)):
    print(f"Received file: {file.filename}")
    
    if not file.filename.endswith(('.pdf', '.docx', '.txt')):
        raise HTTPException(status_code=400, detail="File must be PDF, DOCX, or TXT")
    
    try:
        content = await file.read()
        print(f"File size: {len(content)} bytes")

        if file.filename.endswith('.pdf'):
            text_content = extract_text_from_pdf(content)
        elif file.filename.endswith('.docx'):
            text_content = extract_text_from_docx(content)
        elif file.filename.endswith('.txt'):
            text_content = content.decode("utf-8", errors="ignore")
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        result = analyze_resume(text_content)  # This should return a dict
        return result

    except Exception as e:
        print(f"Error during analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
