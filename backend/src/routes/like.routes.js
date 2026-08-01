import { Router } from "express";
import {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos
} from "../controllers/like.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// All like routes require authentication


// ─────────────────────────────────────────────
// /api/v1/likes
// ─────────────────────────────────────────────

router.route("/toggle/v/:videoId").post(verifyJWT, toggleVideoLike);       // POST /likes/toggle/v/:videoId
router.route("/toggle/c/:commentId").post(verifyJWT, toggleCommentLike);   // POST /likes/toggle/c/:commentId
router.route("/toggle/t/:tweetId").post(verifyJWT, toggleTweetLike);       // POST /likes/toggle/t/:tweetId

router.route("/videos").get(verifyJWT, getLikedVideos);                    // GET  /likes/videos

export default router;