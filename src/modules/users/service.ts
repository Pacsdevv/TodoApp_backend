import * as userRepository from "./repository";

export type CreateUserDto = {
  name: string;
  email: string;
  pass: string;
};


export const getAllUsers = async () => {
  const users = await userRepository.getAllUsers();
  if (users.length === 0) {
    throw new Error("No users found");
  }
  
  return users;
};


export const createUser = async (body: CreateUserDto) => {
  const user = await userRepository.createUser(body);
  return user;
};
  