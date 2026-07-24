import type { Request, Response } from "express";
import { contactService } from "../services/contact.service";

export const contactController = {
  async getAll(_req: Request, res: Response) {
    const contacts = await contactService.getAll();
    return res.status(200).json({ success: true, data: contacts });
  },

  async create(req: Request, res: Response) {
    const contact = await contactService.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Contact message sent successfully",
      data: contact,
    });
  },

  async updateStatus(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const contact = await contactService.updateStatus(id, req.body);
    return res.status(200).json({ success: true, data: contact });
  },

  async archive(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    await contactService.updateStatus(id, { status: "ARCHIVED" });
    return res.status(200).json({ success: true, message: "Contact archived successfully" });
  },

  async exportCsv(_req: Request, res: Response) {
    const contacts = await contactService.getAll();
    const rows = [
      ["Name", "Email", "Phone", "Subject", "Status", "Reply Status", "Created At"],
      ...contacts.map((contact) => [
        contact.name,
        contact.email,
        contact.phone ?? "",
        contact.subject ?? "",
        contact.status,
        contact.replyStatus,
        contact.createdAt.toISOString(),
      ]),
    ];
    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    res.header("Content-Type", "text/csv");
    res.attachment("contacts.csv");
    return res.send(csv);
  },
};
