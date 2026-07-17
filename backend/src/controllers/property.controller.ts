import type { Request, Response } from "express";
import { propertyService } from "../services/property.service";

export const propertyController = {
  async getAll(_req: Request, res: Response) {
    const properties = await propertyService.getAll();
    return res.status(200).json({ success: true, data: properties });
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const property = await propertyService.getById(id);
    return res.status(200).json({ success: true, data: property });
  },

  async create(req: Request, res: Response) {
    const property = await propertyService.create(req.body);
    return res.status(201).json({ success: true, data: property });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const property = await propertyService.update(id, req.body);
    return res.status(200).json({ success: true, data: property });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    await propertyService.delete(id);
    return res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  },
};
