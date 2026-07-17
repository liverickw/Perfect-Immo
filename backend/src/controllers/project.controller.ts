import type { Request, Response } from "express";
import { projectService } from "../services/project.service";

export const projectController = {
  async getAll(_req: Request, res: Response) {
    const projects = await projectService.getAll();
    return res.status(200).json({ success: true, data: projects });
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const project = await projectService.getById(id);
    return res.status(200).json({ success: true, data: project });
  },

  async create(req: Request, res: Response) {
    const project = await projectService.create(req.body);
    return res.status(201).json({ success: true, data: project });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const project = await projectService.update(id, req.body);
    return res.status(200).json({ success: true, data: project });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    await projectService.delete(id);
    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  },
};
