import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import mediaRoutes from "./Routes/media.routes.js";
import aiRoutes from "./Routes/ai.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// FIX __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// BACKEND ROOT
const rootDir = path.resolve(__dirname, "../");

// DOWNLOADS PATH
const downloadsPath = path.join(rootDir, "downloads");

console.log("Serving downloads from:", downloadsPath);

// SERVE FILES
app.use("/downloads", express.static(downloadsPath));

// ROUTES
app.use("/api/media", mediaRoutes);
app.use("/api/ai", aiRoutes);

export default app;