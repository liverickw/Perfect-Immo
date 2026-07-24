import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware, requireRoles } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../utils/async-handler";
import { loginSchema, registerSchema } from "../validators/auth.validator";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(authController.register));
router.post("/login", validate(loginSchema), asyncHandler(authController.login));
router.get("/me", authMiddleware, asyncHandler(authController.me));
router.get("/users", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN"), asyncHandler(authController.getUsers));
router.post("/users", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN"), validate(registerSchema), asyncHandler(authController.createUser));
router.put("/users/:id", authMiddleware, requireRoles("SUPER_ADMIN", "ADMIN"), asyncHandler(authController.updateUser));
router.delete("/users/:id", authMiddleware, requireRoles("SUPER_ADMIN"), asyncHandler(authController.deleteUser));

export default router;
