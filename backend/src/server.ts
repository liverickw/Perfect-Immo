import cors from "cors";
import express from "express";
import { env } from "./config/env";
import prisma from "./config/prisma";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./middleware/error.middleware";
import apiRoutes from "./routes";

const app = express();

const allowedOrigins = env.FRONTEND_URL.split(",").map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Perfect-Immo backend is running",
  });
});

app.get("/health/db", async (_req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      success: true,
      message: "Database connection is working",
    });
  } catch (error) {
    return next(error);
  }
});

app.get("/api", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Perfect-Immo API",
    version: "1.0.0",
    endpoints: {
      auth: ["/api/auth/register", "/api/auth/login"],
      properties: ["/api/properties", "/api/properties/:id"],
      projects: ["/api/projects", "/api/realisations"],
      blogs: ["/api/blogs", "/api/blogs/:id", "/api/blogs/slug/:slug"],
      contacts: ["/api/contacts"],
      health: ["/health", "/health/db"],
    },
  });
});

app.use("/api", apiRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const server = app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

const shutdown = async () => {
  await prisma.$disconnect();
  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
