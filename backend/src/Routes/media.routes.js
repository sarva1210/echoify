import express from "express";
import { convertMedia, getJobStatus, previewAudio, getMetadata } from "../Controllers/media.controller.js";

const router = express.Router();

router.get("/convert", convertMedia);
router.get("/status/:id", getJobStatus);
router.get("/preview", previewAudio);
router.get("/info", getMetadata);

export default router;