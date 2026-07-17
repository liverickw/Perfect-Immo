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
};
