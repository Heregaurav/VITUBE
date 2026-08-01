import { Router } from "express";
import {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
} from "../controllers/video.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// All video routes require authentication


// ─────────────────────────────────────────────
// /api/v1/videos
// ─────────────────────────────────────────────

router.route("/")
    .get(getAllVideos)       // GET  /videos?page=1&limit=10&query=&sortBy=&sortType=&userId=
    .post(        verifyJWT,        upload.fields([     // POST /videos  — publish a new video
            {
                name: "videoFile",
                maxCount: 1
            },
            {
                name: "thumbnail",
                maxCount: 1
            }
        ]),
        publishAVideo
    );

// ─────────────────────────────────────────────
// /api/v1/videos/:videoId
// ─────────────────────────────────────────────

router.route("/:videoId")
    .get(getVideoById)      // GET    /videos/:videoId
    .patch(
        verifyJWT,
        upload.single("thumbnail"),  // PATCH  /videos/:videoId — update title, description, thumbnail
        updateVideo
    )
    .delete(verifyJWT, deleteVideo);   // DELETE /videos/:videoId

// ─────────────────────────────────────────────
// /api/v1/videos/toggle/publish/:videoId
// ─────────────────────────────────────────────

router.route("/toggle/publish/:videoId")
    .patch(verifyJWT, togglePublishStatus); // PATCH /videos/toggle/publish/:videoId

export default router;