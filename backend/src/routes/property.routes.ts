import { Router } from "express";
import { propertyController } from "../controllers/property.controller";
import { authMiddleware } from "../middleware/auth.middleware";
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
router.post("/", authMiddleware, validate(propertySchema), asyncHandler(propertyController.create));
router.put(
  "/:id",
  authMiddleware,
  validate(idParamSchema, "params"),
  validate(updatePropertySchema),
  asyncHandler(propertyController.update)
);
router.delete(
  "/:id",
  authMiddleware,
  validate(idParamSchema, "params"),
  asyncHandler(propertyController.delete)
);

export default router;
