import { Router } from "express";
import { blogController } from "../controllers/blog.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../utils/async-handler";
import { idParamSchema } from "../validators/common.validator";
import { blogSchema, updateBlogSchema } from "../validators/blog.validator";

const router = Router();

router.get("/", asyncHandler(blogController.getAll));
router.get("/slug/:slug", asyncHandler(blogController.getBySlug));
router.get("/:id", validate(idParamSchema, "params"), asyncHandler(blogController.getById));
router.post("/", authMiddleware, validate(blogSchema), asyncHandler(blogController.create));
router.put(
  "/:id",
  authMiddleware,
  validate(idParamSchema, "params"),
  validate(updateBlogSchema),
  asyncHandler(blogController.update)
);
router.delete(
  "/:id",
  authMiddleware,
  validate(idParamSchema, "params"),
  asyncHandler(blogController.delete)
);

export default router;
