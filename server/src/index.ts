import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import multer from "multer";
import { resumeAnalyzer } from "./controllers/resume.controller";
import connectDB from "./dbConnect";

const upload = multer();
connectDB();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.post("/api/resume/analyze", upload.single("file"), resumeAnalyzer);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
