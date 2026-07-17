import { Router } from "express";
import { contactController } from "../controllers/contact.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../utils/async-handler";
import { contactSchema } from "../validators/contact.validator";

const router = Router();

router.post("/", validate(contactSchema), asyncHandler(contactController.create));
router.get("/", authMiddleware, asyncHandler(contactController.getAll));

export default router;
