import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";
import { AppError } from "./app-error";

const FOLDERS = ["properties", "projects", "blogs"] as const;
export type UploadFolder = (typeof FOLDERS)[number];

export const isValidUploadFolder = (value: string): value is UploadFolder =>
  (FOLDERS as readonly string[]).includes(value);

/**
 * Uploads an in-memory image buffer to Cloudinary, auto-converted to
 * optimized WebP (matches "Images -> Cloudinary -> Optimisées WebP" in the flux).
 */
export const uploadBufferToCloudinary = (
  buffer: Buffer,
  folder: UploadFolder
): Promise<{ url: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `perfect-immo/${folder}`,
        resource_type: "image",
        format: "webp",
        transformation: [{ quality: "auto", fetch_format: "webp" }],
      },
      (error, result) => {
        if (error || !result) {
          return reject(new AppError(error?.message ?? "Image upload failed", 502));
        }
        return resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};
