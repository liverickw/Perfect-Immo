import type { Request, Response } from "express";
import prisma from "../config/prisma";

export const adminController = {
  async dashboard(_req: Request, res: Response) {
    const [
      totalProjects,
      totalProperties,
      totalBlogs,
      totalMessages,
      recentContacts,
      recentProjects,
      recentBlogs,
      latestActivity,
    ] = await Promise.all([
      prisma.project.count({ where: { deletedAt: null } }),
      prisma.property.count({ where: { deletedAt: null } }),
      prisma.blog.count({ where: { deletedAt: null } }),
      prisma.contact.count(),
      prisma.contact.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.project.findMany({ where: { deletedAt: null }, orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.blog.findMany({ where: { deletedAt: null }, orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        widgets: {
          totalProjects,
          totalProperties,
          totalBlogs,
          totalMessages,
          websiteVisitors: 0,
        },
        recentContacts,
        recentProjects,
        recentBlogs,
        latestActivity,
        charts: {
          projectsPerMonth: [],
          contactsPerMonth: [],
        },
      },
    });
  },

  async getSettings(_req: Request, res: Response) {
    const settings = await prisma.setting.findMany({ orderBy: { key: "asc" } });
    return res.status(200).json({ success: true, data: settings });
  },

  async upsertSetting(req: Request, res: Response) {
    const { key } = req.params as { key: string };
    const setting = await prisma.setting.upsert({
      where: { key },
      create: { key, value: req.body.value },
      update: { value: req.body.value },
    });
    return res.status(200).json({ success: true, data: setting });
  },

  async createSetting(req: Request, res: Response) {
    const setting = await prisma.setting.upsert({
      where: { key: req.body.key },
      create: { key: req.body.key, value: req.body.value },
      update: { value: req.body.value },
    });
    return res.status(201).json({ success: true, data: setting });
  },

  async deleteSetting(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    await prisma.setting.delete({ where: { id } });
    return res.status(200).json({ success: true, message: "Setting deleted successfully" });
  },

  async getMedia(_req: Request, res: Response) {
    const media = await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json({ success: true, data: media });
  },

  async createMedia(req: Request, res: Response) {
    const media = await prisma.mediaAsset.create({ data: req.body });
    return res.status(201).json({ success: true, data: media });
  },

  async deleteMedia(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    await prisma.mediaAsset.delete({ where: { id } });
    return res.status(200).json({ success: true, message: "Media deleted successfully" });
  },

  async getAuditLogs(_req: Request, res: Response) {
    const logs = await prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    return res.status(200).json({ success: true, data: logs });
  },
};
