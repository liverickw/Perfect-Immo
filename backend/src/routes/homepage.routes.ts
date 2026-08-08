import { Router } from "express";
import { homepageController } from "../controllers/homepage.controller";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.get("/", asyncHandler(homepageController.getPublished));

export default router;
