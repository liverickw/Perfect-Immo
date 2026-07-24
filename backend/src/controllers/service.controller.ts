import type { Request, Response } from "express";
import { serviceService } from "../services/service.service";

export const serviceController = {
  async getAll(_req: Request, res: Response) {
    const services = await serviceService.getAll();
    return res.status(200).json({ success: true, data: services });
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const service = await serviceService.getById(id);
    return res.status(200).json({ success: true, data: service });
  },

  async create(req: Request, res: Response) {
    const service = await serviceService.create(req.body);
    return res.status(201).json({ success: true, data: service });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const service = await serviceService.update(id, req.body);
    return res.status(200).json({ success: true, data: service });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    await serviceService.delete(id);
    return res.status(200).json({ success: true, message: "Service archived successfully" });
  },
};
