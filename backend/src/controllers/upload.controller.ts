import type { Request, Response } from "express";
import { isCloudinaryConfigured } from "../config/cloudinary";
import { AppError } from "../utils/app-error";
import {
  isValidUploadFolder,
  uploadBufferToCloudinary,
} from "../utils/cloudinary-upload";

export const uploadController = {
  async uploadImage(req: Request, res: Response) {
    if (!isCloudinaryConfigured) {
      throw new AppError(
        "Image upload is not configured on this server yet",
        503
      );
    }

    if (!req.file) {
      throw new AppError("No image file provided (field name: image)", 400);
    }

    const folder = req.body.folder ?? "properties";
    if (!isValidUploadFolder(folder)) {
      throw new AppError(
        "Invalid folder, expected one of: properties, projects, blogs, services, realisations, media",
        400
      );
    }

    const result = await uploadBufferToCloudinary(req.file.buffer, folder);

    return res.status(201).json({
      success: true,
      data: { imageUrl: result.url, publicId: result.publicId },
    });
  },
};
