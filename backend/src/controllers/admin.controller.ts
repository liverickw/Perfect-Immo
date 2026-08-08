import type { Request, Response } from "express";
import prisma from "../config/prisma";

export const adminController = {
  async dashboard(_req: Request, res: Response) {
    const [
      totalServices,
      totalProjects,
      totalRealisations,
      totalProperties,
      publishedBlogPosts,
      unreadContactMessages,
      recentContacts,
      recentProjects,
      recentRealisations,
      recentUploads,
      recentBlogs,
      latestActivity,
    ] = await Promise.all([
      prisma.service.count({ where: { deletedAt: null } }),
      prisma.project.count({ where: { deletedAt: null } }),
      prisma.realisation.count({ where: { deletedAt: null } }),
      prisma.property.count({ where: { deletedAt: null } }),
      prisma.blog.count({ where: { deletedAt: null, published: true } }),
      prisma.contact.count({ where: { status: "UNREAD", archivedAt: null } }),
      prisma.contact.findMany({ where: { archivedAt: null }, orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.project.findMany({ where: { deletedAt: null }, orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.realisation.findMany({ where: { deletedAt: null }, orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.blog.findMany({ where: { deletedAt: null }, orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        widgets: {
          totalServices,
          totalProjects,
          totalRealisations,
          totalProperties,
          publishedBlogPosts,
          unreadContactMessages,
        },
        recentContacts,
        recentProjects,
        recentRealisations,
        recentUploads,
        recentBlogs,
        latestActivity,
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
