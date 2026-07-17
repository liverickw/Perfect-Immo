import { Router } from "express";
import authRoutes from "./auth.routes";
import blogRoutes from "./blog.routes";
import contactRoutes from "./contact.routes";
import projectRoutes from "./project.routes";
import propertyRoutes from "./property.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/properties", propertyRoutes);
router.use("/projects", projectRoutes);
router.use("/realisations", projectRoutes);
router.use("/blogs", blogRoutes);
router.use("/contacts", contactRoutes);

export default router;
