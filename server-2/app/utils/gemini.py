import os
import json
import re
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_resume(resume_text):
    prompt = f"""
    Analyze this resume for ATS (Applicant Tracking System) optimization. Provide:
    1. A score out of 100
    2. Key strengths
    3. Areas for improvement
    4. Suggested improvements.
    
    All of these should be an array.
    
    Resume:
    {resume_text}
    
    Format response as JSON with these keys: score, strengths, improvements, suggestions
    """
    
    model = genai.GenerativeModel('gemini-1.5-pro')
    response = model.generate_content(prompt)
    
    try:
        # Extract the JSON content from the response text
        text_content = response.text
        
        # If the response is wrapped in markdown code block, extract just the JSON
        json_match = re.search(r'```json\s*(.*?)\s*```', text_content, re.DOTALL)
        if json_match:
            json_str = json_match.group(1)
        else:
            json_str = text_content
            
        # Parse the JSON string
        result = json.loads(json_str)
        print("Parsed JSON:", result)
        return result
    except Exception as e:
        print(f"Error parsing Gemini response: {str(e)}")
        return {"error": str(e), "score": 0, "strengths": [], "improvements": [], "suggestions": []}