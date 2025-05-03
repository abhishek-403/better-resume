"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const resume_controller_1 = require("./controllers/resume.controller");
const dbConnect_1 = __importDefault(require("./dbConnect"));
const upload = (0, multer_1.default)();
(0, dbConnect_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
app.get("/api/analyze", upload.single("file"), resume_controller_1.resumeAnalyzer);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
