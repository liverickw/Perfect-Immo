import { Router } from "express";
import { contactController } from "../controllers/contact.controller";
import { authMiddleware, requireRoles } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../utils/async-handler";
import { idParamSchema } from "../validators/common.validator";
import { contactSchema } from "../validators/contact.validator";

const router = Router();

router.post("/", validate(contactSchema), asyncHandler(contactController.create));
router.get("/", authMiddleware, asyncHandler(contactController.getAll));
router.get("/export", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN"), asyncHandler(contactController.exportCsv));
router.put("/:id", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN", "EDITOR"), validate(idParamSchema, "params"), asyncHandler(contactController.updateStatus));
router.delete("/:id", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN"), validate(idParamSchema, "params"), asyncHandler(contactController.archive));

export default router;
