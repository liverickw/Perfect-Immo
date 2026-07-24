import { Router } from "express";
import { projectController } from "../controllers/project.controller";
import { authMiddleware, requireRoles } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../utils/async-handler";
import { idParamSchema } from "../validators/common.validator";
import { projectSchema, updateProjectSchema } from "../validators/project.validator";

const router = Router();

router.get("/", asyncHandler(projectController.getAll));
router.get("/:id", validate(idParamSchema, "params"), asyncHandler(projectController.getById));
router.post("/", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN", "EDITOR"), validate(projectSchema), asyncHandler(projectController.create));
router.put(
  "/:id",
  authMiddleware,
  requireRoles("SUPER_ADMIN", "ADMIN", "EDITOR"),
  validate(idParamSchema, "params"),
  validate(updateProjectSchema),
  asyncHandler(projectController.update)
);
router.delete(
  "/:id",
  authMiddleware,
  requireRoles("SUPER_ADMIN", "ADMIN"),
  validate(idParamSchema, "params"),
  asyncHandler(projectController.delete)
);

export default router;
