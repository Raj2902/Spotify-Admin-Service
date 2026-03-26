import type { Request } from "express";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  playlist: string[];
}

export interface authenticatedRequest extends Request {
  user?: IUser | null;
}
