import express from "express";
import { processAI } from "../Controllers/ai.controller.js";

const router = express.Router();

router.post("/process", processAI);

export default router;