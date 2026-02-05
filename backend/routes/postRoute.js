import express from "express";
import { createPost, getFeed, likePost, addcomment } from "../controllers/postController.js";
import { protect } from "../middelwares/authmiddelwaer.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getFeed);
router.post("/:id/like", protect, likePost);
router.post("/:id/comment", protect, addcomment);

export default router;
