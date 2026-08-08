import { Router } from "express";
import { serviceController } from "../controllers/service.controller";
import { authMiddleware, requireRoles } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../utils/async-handler";
import { idParamSchema } from "../validators/common.validator";
import { servicePageSettingsSchema, serviceSchema, updateServiceSchema } from "../validators/service.validator";

const router = Router();

router.get("/page-settings", asyncHandler(serviceController.getPageSettings));
router.get("/admin/page-settings", authMiddleware, asyncHandler(serviceController.getPageSettings));
router.put("/admin/page-settings", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN", "EDITOR"), validate(servicePageSettingsSchema), asyncHandler(serviceController.savePageSettings));
router.get("/", asyncHandler(serviceController.getAll));
router.get("/admin/all", authMiddleware, asyncHandler(serviceController.getAdminAll));
router.get("/:id", validate(idParamSchema, "params"), asyncHandler(serviceController.getById));
router.post("/", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN", "EDITOR"), validate(serviceSchema), asyncHandler(serviceController.create));
router.put("/:id", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN", "EDITOR"), validate(idParamSchema, "params"), validate(updateServiceSchema), asyncHandler(serviceController.update));
router.delete("/:id", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN"), validate(idParamSchema, "params"), asyncHandler(serviceController.delete));

export default router;
