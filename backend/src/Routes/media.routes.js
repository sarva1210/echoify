import express from "express";
import { convertMedia, getMetadata,getHistory, getMediaById } from "../Controllers/media.controller.js";

const router = express.Router();

//convert
router.get("/convert", convertMedia);

//info
router.get("/info", getMetadata);

//history
router.get("/history", getHistory);
router.get("/:id", getMediaById);

export default router;