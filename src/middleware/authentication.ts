import type { NextFunction, Request, Response } from "express";
import axios from "axios";
import type { authenticatedRequest } from "../interface.js";
import { asyncHandler } from "./asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import dotenv from "dotenv";

dotenv.config();

export const isAuth = asyncHandler(
  async (
    req: authenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const token = req.headers.token as string;
    if (!token) {
      throw new AppError("Please Login", 403);
    }

    const { data } = await axios.get(`${process.env.USER_URL}/api/v1/user/me`, {
      headers: {
        token,
      },
    });

    req.user = data;

    next();
  },
);
