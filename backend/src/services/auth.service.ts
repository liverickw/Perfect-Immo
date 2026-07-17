import bcrypt from "bcryptjs";
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
      role: "ADMIN",
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
};
