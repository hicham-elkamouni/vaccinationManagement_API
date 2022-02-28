import { IManager } from "@interfaces/mongoose.types";
import jwt from "jsonwebtoken";
// generate tokens :
export const createToken = (payload: IManager|null=null) => {
  if (!payload) return null;
  return jwt.sign({payload}, process.env.SECRET_KEY_MANAGER as string, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token = null, role = null) => {
  if (!token) return null;

  try {

    return jwt.verify(token, process.env.SECRET_KEY_MANAGER as string);

  } catch (err) {
    return null;
  }
};
