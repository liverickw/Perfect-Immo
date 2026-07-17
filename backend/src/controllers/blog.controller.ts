import type { Request, Response } from "express";
import { blogService } from "../services/blog.service";

export const blogController = {
  async getAll(_req: Request, res: Response) {
    const blogs = await blogService.getAll();
    return res.status(200).json({ success: true, data: blogs });
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const blog = await blogService.getById(id);
    return res.status(200).json({ success: true, data: blog });
  },

  async getBySlug(req: Request, res: Response) {
    const { slug } = req.params as { slug: string };
    const blog = await blogService.getBySlug(slug);
    return res.status(200).json({ success: true, data: blog });
  },

  async create(req: Request, res: Response) {
    const blog = await blogService.create(req.body);
    return res.status(201).json({ success: true, data: blog });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const blog = await blogService.update(id, req.body);
    return res.status(200).json({ success: true, data: blog });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    await blogService.delete(id);
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  },
};
