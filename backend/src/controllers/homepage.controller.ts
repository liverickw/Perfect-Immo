import type { Request, Response } from "express";
import { homepageService } from "../services/homepage.service";

export const homepageController = {
  async getPublished(_req: Request, res: Response) {
    const content = await homepageService.getPublished();
    return res.status(200).json({ success: true, data: content });
  },

  async getAdmin(_req: Request, res: Response) {
    const content = await homepageService.getAdminContent();
    return res.status(200).json({ success: true, data: content });
  },

  async save(req: Request, res: Response) {
    const saved = await homepageService.save(req.body.content, req.user?.id);
    return res.status(200).json({ success: true, data: saved });
  },
};
