import { Router } from "express";
import { realisationController } from "../controllers/realisation.controller";
import { authMiddleware, requireRoles } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../utils/async-handler";
import { idParamSchema } from "../validators/common.validator";
import {
  realisationSchema,
  updateRealisationSchema,
} from "../validators/realisation.validator";

const router = Router();

router.get("/", asyncHandler(realisationController.getAll));
router.get("/admin/all", authMiddleware, asyncHandler(realisationController.getAdminAll));
router.get("/:id", validate(idParamSchema, "params"), asyncHandler(realisationController.getById));
router.post("/", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN", "EDITOR"), validate(realisationSchema), asyncHandler(realisationController.create));
router.put("/:id", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN", "EDITOR"), validate(idParamSchema, "params"), validate(updateRealisationSchema), asyncHandler(realisationController.update));
router.delete("/:id", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN"), validate(idParamSchema, "params"), asyncHandler(realisationController.delete));

export default router;
