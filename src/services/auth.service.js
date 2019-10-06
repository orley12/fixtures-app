import { User } from "../models/user";

export const createAdmin = (admin) => {
  return User.create(admin);
};

export const findAdmin = (email) => {
  return User.find({ email });
};

export const createUser = (user) => {
  return User.create(user);
};

export const findUser = (email) => {
  return User.find({ email });
};

export const findAdminById = (_id) => {
  return User.findById(_id);
};

export const findUserById = (_id) => {
  return User.findById(_id);
};