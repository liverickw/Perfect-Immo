import { Router } from "express";
import authRoutes from "./auth.routes";
import blogRoutes from "./blog.routes";
import contactRoutes from "./contact.routes";
import adminRoutes from "./admin.routes";
import homepageRoutes from "./homepage.routes";
import projectRoutes from "./project.routes";
import propertyRoutes from "./property.routes";
import realisationRoutes from "./realisation.routes";
import serviceRoutes from "./service.routes";
import uploadRoutes from "./upload.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/homepage", homepageRoutes);
router.use("/properties", propertyRoutes);
router.use("/projects", projectRoutes);
router.use("/realisations", realisationRoutes);
router.use("/services", serviceRoutes);
router.use("/blogs", blogRoutes);
router.use("/contacts", contactRoutes);
router.use("/upload", uploadRoutes);
router.use("/admin", adminRoutes);

export default router;
