import type { Request, Response } from "express";
import prisma from "../config/prisma";
import { defaultServicePageSettings, SERVICE_PAGE_SETTING_KEY } from "../services/default-service-page";
import { serviceService } from "../services/service.service";

export const serviceController = {
  async getPageSettings(_req: Request, res: Response) {
    const setting = await prisma.setting.findUnique({ where: { key: SERVICE_PAGE_SETTING_KEY } });
    return res.status(200).json({ success: true, data: setting?.value || defaultServicePageSettings });
  },

  async savePageSettings(req: Request, res: Response) {
    const setting = await prisma.setting.upsert({
      where: { key: SERVICE_PAGE_SETTING_KEY },
      create: { key: SERVICE_PAGE_SETTING_KEY, value: req.body },
      update: { value: req.body },
    });
    await prisma.auditLog.create({
      data: {
        action: "UPDATE_SERVICE_PAGE_SETTINGS",
        entity: "ServicePage",
        entityId: setting.id,
        userId: req.user?.id,
      },
    });
    return res.status(200).json({ success: true, data: setting.value });
  },

  async getAll(_req: Request, res: Response) {
    const services = await serviceService.getAll();
    return res.status(200).json({ success: true, data: services });
  },

  async getAdminAll(_req: Request, res: Response) {
    const services = await serviceService.getAll({ includeDrafts: true });
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
