import type { Request, Response } from "express";
import { realisationService } from "../services/realisation.service";

export const realisationController = {
  async getAll(_req: Request, res: Response) {
    const realisations = await realisationService.getAll();
    return res.status(200).json({ success: true, data: realisations });
  },

  async getAdminAll(_req: Request, res: Response) {
    const realisations = await realisationService.getAll({ includeDrafts: true });
    return res.status(200).json({ success: true, data: realisations });
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const realisation = await realisationService.getById(id);
    return res.status(200).json({ success: true, data: realisation });
  },

  async create(req: Request, res: Response) {
    const realisation = await realisationService.create(req.body);
    return res.status(201).json({ success: true, data: realisation });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const realisation = await realisationService.update(id, req.body);
    return res.status(200).json({ success: true, data: realisation });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    await realisationService.delete(id);
    return res.status(200).json({ success: true, message: "Realisation archived successfully" });
  },
};
