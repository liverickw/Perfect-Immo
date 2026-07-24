import bcrypt from "bcryptjs";
import type { Role } from "@prisma/client";
import { authRepository } from "../repositories/auth.repository";
import { AppError } from "../utils/app-error";
import { generateToken } from "../utils/jwt";
import type { LoginInput, RegisterInput } from "../validators/auth.validator";

const sanitizeUser = <T extends { password: string }>(user: T) => {
  const { password: _password, ...safeUser } = user;
  return safeUser;
};

export const authService = {
  async register(data: RegisterInput) {
    const existingUser = await authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError("An admin with this email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await authRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role ?? "ADMIN",
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { user: sanitizeUser(user), token };
  },

  async login(data: LoginInput) {
    const user = await authRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    if (!user.active || user.deletedAt) {
      throw new AppError("This account is inactive", 403);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { user: sanitizeUser(user), token };
  },

  getUsers() {
    return authRepository.findAll();
  },

  async createUser(data: RegisterInput) {
    return this.register(data);
  },

  async updateUser(id: string, data: Partial<RegisterInput> & { active?: boolean; role?: Role }) {
    const existing = await authRepository.findById(id);
    if (!existing) throw new AppError("User not found", 404);

    const updateData: Record<string, unknown> = {
      name: data.name,
      email: data.email,
      role: data.role,
      active: data.active,
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 12);
    }

    const user = await authRepository.update(id, updateData);
    return sanitizeUser(user);
  },

  async deactivateUser(id: string) {
    const existing = await authRepository.findById(id);
    if (!existing) throw new AppError("User not found", 404);
    if (existing.role === "SUPER_ADMIN") {
      throw new AppError("Super Admin accounts cannot be deleted", 403);
    }
    const user = await authRepository.update(id, {
      active: false,
      deletedAt: new Date(),
    });
    return sanitizeUser(user);
  },
};
