from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import resume

app = FastAPI(title="ATS Resume Scanner")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(resume.router, prefix="/api/resume", tags=["Resume"])

@app.get("/")
def read_root():
    return {"message": "ATS Resume Scanner API"}