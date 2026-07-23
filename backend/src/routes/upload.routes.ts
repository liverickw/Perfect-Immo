import { Router } from "express";
import { uploadController } from "../controllers/upload.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { uploadImage } from "../middleware/upload.middleware";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

// Admin-only: Browser -> Express -> Cloudinary (multer parses multipart, then we stream to Cloudinary)
router.post(
  "/image",
  authMiddleware,
  uploadImage,
  asyncHandler(uploadController.uploadImage)
);

export default router;
