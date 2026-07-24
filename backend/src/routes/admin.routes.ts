import { Router } from "express";
import { adminController } from "../controllers/admin.controller";
import { authMiddleware, requireRoles } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.use(authMiddleware);

router.get("/dashboard", asyncHandler(adminController.dashboard));
router.get("/settings", requireRoles("SUPER_ADMIN", "ADMIN"), asyncHandler(adminController.getSettings));
router.post("/settings", requireRoles("SUPER_ADMIN", "ADMIN"), asyncHandler(adminController.createSetting));
router.put("/settings/:key", requireRoles("SUPER_ADMIN", "ADMIN"), asyncHandler(adminController.upsertSetting));
router.delete("/settings/:id", requireRoles("SUPER_ADMIN", "ADMIN"), asyncHandler(adminController.deleteSetting));
router.get("/media", asyncHandler(adminController.getMedia));
router.post("/media", requireRoles("SUPER_ADMIN", "ADMIN", "EDITOR"), asyncHandler(adminController.createMedia));
router.delete("/media/:id", requireRoles("SUPER_ADMIN", "ADMIN"), asyncHandler(adminController.deleteMedia));
router.get("/audit-logs", requireRoles("SUPER_ADMIN", "ADMIN"), asyncHandler(adminController.getAuditLogs));

export default router;
