import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mediaRoutes from "../src/Routes/media.routes.js";
import aiRoutes from "../src/Routes/ai.routes.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/media", mediaRoutes);
app.use("/api/ai", aiRoutes);

export default app;