import express from "express";
import { convertMedia, getMetadata,getHistory, getMediaById } from "../Controllers/media.controller.js";

const router = express.Router();

router.get("/convert", convertMedia);
router.get("/info", getMetadata);
router.get("/history", getHistory);
router.get("/:id", getMediaById);

export default router;