# 🗃️ Better Resume

**Better Resume** is an AI-powered web application designed to help job seekers optimize their resumes. By analyzing resumes against specific job descriptions, it provides an ATS (Applicant Tracking System) compatibility score and actionable suggestions for improvement. The application leverages the Google Gemini API for advanced natural language processing. 

## ✨ Features

- Resume Upload: Upload your resume in PDF format for analysis.

- Job Description Input: Paste the job description to tailor the analysis.

- ATS Compatibility Score: Receive a percentage score indicating how well your resume aligns with the job description.

- Improvement Suggestions: Get detailed feedback on missing keywords, formatting issues, and other enhancements

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**:  Node.js, Express.js
- **AI Integration**: Google Gemini API

- **File Handling**: Multer (for file uploads)

- **PDF Parsing**: pdf-parse


## 🚀 Installation
### Prerequisites
- Node.js (v14 or higher)

- Google Gemini API Key

1. Clone the repository

    ```  
    git clone https://github.com/abhishek-403/better-resume.git
    cd better-resume
    ```
           


  2. Install the packages
        ```
        cd client
        npm install
        
        cd server
        npm install
        ```

 3. Create a .env file in the root directory and add your following:
   
     ```
     GEMINI_API_KEY=your_google_gemini_api_key
     MONGO_URI=NOT_REQUIRED
     PORT=8080
     CORS_ORIGIN=http://localhost:5173
       ```
  4. Run the server
        ```
        cd server
        npm run dev    
        ```

   5. Run the client

        ```
        cd client
        npm run dev
        ```