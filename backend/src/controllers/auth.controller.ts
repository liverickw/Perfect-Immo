import type { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body);

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: result,
    });
  },

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body);

    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      data: result,
    });
  },

  async me(req: Request, res: Response) {
    return res.status(200).json({ success: true, data: req.user });
  },

  async getUsers(_req: Request, res: Response) {
    const users = await authService.getUsers();
    return res.status(200).json({ success: true, data: users });
  },

  async createUser(req: Request, res: Response) {
    const result = await authService.createUser(req.body);
    return res.status(201).json({ success: true, data: result });
  },

  async updateUser(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const user = await authService.updateUser(id, req.body);
    return res.status(200).json({ success: true, data: user });
  },

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    await authService.deactivateUser(id);
    return res.status(200).json({ success: true, message: "User deactivated successfully" });
  },
};
