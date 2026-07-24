import { Router } from "express";
import { propertyController } from "../controllers/property.controller";
import { authMiddleware, requireRoles } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../utils/async-handler";
import { idParamSchema } from "../validators/common.validator";
import {
  propertySchema,
  updatePropertySchema,
} from "../validators/property.validator";

const router = Router();

router.get("/", asyncHandler(propertyController.getAll));
router.get("/:id", validate(idParamSchema, "params"), asyncHandler(propertyController.getById));
router.post("/", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN", "EDITOR"), validate(propertySchema), asyncHandler(propertyController.create));
router.put(
  "/:id",
  authMiddleware,
  requireRoles("SUPER_ADMIN", "ADMIN", "EDITOR"),
  validate(idParamSchema, "params"),
  validate(updatePropertySchema),
  asyncHandler(propertyController.update)
);
router.delete(
  "/:id",
  authMiddleware,
  requireRoles("SUPER_ADMIN", "ADMIN"),
  validate(idParamSchema, "params"),
  asyncHandler(propertyController.delete)
);

export default router;
