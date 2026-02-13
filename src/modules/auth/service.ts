import * as userRepository from "../users/repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { LoginDTO, RegisterDTO, UserDTO } from "../../lib/dtos";
import { createError } from "../../middlewares/errorHandler";
import type { AuthPayload, AuthResponse } from "../../lib/types";
import { config } from "../../config";

const generateToken = (payload: AuthPayload): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });
};

export const signUp = async (data: RegisterDTO): Promise<AuthResponse> => {
  const existingUser = await userRepository.getUserByEmail(data.email);

  if (existingUser) {
    throw createError("Email already registered", 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await userRepository.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  const token = generateToken({
    user_id: newUser.id,
    email: newUser.email,
  });

  const { password, ...newUserClean } = newUser;

  return { user: newUserClean, token };
};

export const login = async (login: LoginDTO): Promise<AuthResponse> => {
  const user = await userRepository.getUserByEmail(login.email);

  if (!user) throw createError("Invalid email or password", 401);

  const isMatch = await bcrypt.compare(login.password, user.password);

  if (!isMatch) throw createError("Invalid email or password", 401);

  const token = generateToken({
    user_id: user.id,
    email: user.email,
  });

  const { password, ...userClean } = user;

  return {
    user: userClean,
    token,
  };
};
