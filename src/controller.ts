import type { authenticatedRequest } from "./interface.js";
import { asyncHandler } from "./middleware/asyncHandler.js";
import { json, type Response } from "express";
import { AppError } from "./utils/AppError.js";
import getBuffer from "./config/dataUri.js";
import cloudinary from "cloudinary";
import { sql } from "./config/db.js";

export const addAlbum = asyncHandler(
  async (req: authenticatedRequest, res: Response) => {
    if (req.user?.role !== "admin") {
      throw new AppError("You are not admin", 401);
    }

    const { title, description } = req.body;

    const file = req.file;

    if (!file) {
      throw new AppError("No file provided", 400);
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
      throw new AppError("Failed to generate file buffer", 500);
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
      folder: "albums",
    });

    const result = await sql`
    INSERT INTO albums (title, description, thumbnail) VALUES (${title},${description},
    ${cloud.secure_url}) RETURNING *
    `;

    res.status(201).json({
      message: "Album created",
      album: result[0],
    });
  },
);

export const addSong = asyncHandler(
  async (req: authenticatedRequest, res: Response) => {
    if (req.user?.role !== "admin") {
      throw new AppError("You are not admin", 401);
    }

    const { title, description, album } = req.body;

    const isAlbum = await sql`SELECT * FROM albums WHERE id = ${album}`;

    if (isAlbum.length === 0) {
      throw new AppError("No Album with this id", 404);
    }

    const file = req.file;

    if (!file) {
      throw new AppError("No file provided", 400);
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
      throw new AppError("Failed to generate file buffer", 500);
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
      folder: "songs",
      resource_type: "video",
    });

    const result = await sql`
    INSERT INTO songs (title, description, audio, album_id) VALUES
    (${title},${description},${cloud.secure_url},${album})
    `;

    res.status(201).json({
      message: "Song Added",
    });
  },
);
