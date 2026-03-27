import type { authenticatedRequest } from "./interface.js";
import { asyncHandler } from "./middleware/asyncHandler.js";
import { json, type Response } from "express";
import { AppError } from "./utils/AppError.js";
import getBuffer from "./config/dataUri.js";
import cloudinary from "cloudinary";
import { sql } from "./config/db.js";
import { getAssetPublicId } from "./libs/helper.js";
import { redisClient } from "./index.js";

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

    if (redisClient.isReady) {
      await redisClient.del("albums");
      console.log("Cache invalidated for albums");
    }

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
    (${title},${description},${cloud.secure_url},${album}) RETURNING *
    `;

    if (redisClient.isReady) {
      await redisClient.del("songs");
      console.log("Cache invalidated for songs");
    }

    res.status(201).json({
      message: "Song Added",
      data: result[0],
    });
  },
);

export const addThumbnail = asyncHandler(
  async (req: authenticatedRequest, res: Response) => {
    if (req.user?.role !== "admin") {
      throw new AppError("You are not admin", 401);
    }

    const song = await sql`SELECT * FROM songs WHERE id = ${req.params.id}`;

    if (song.length === 0) {
      throw new AppError("No song with this id", 404);
    }

    const file = req.file;

    if (!file) {
      throw new AppError("No file provided", 400);
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
      throw new AppError("Failed to generate file buffer", 500);
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content);

    const result = await sql`
    UPDATE songs SET thumbnail = ${cloud.secure_url} WHERE id = ${req.params.id} RETURNING *
    `;

    if (redisClient.isReady) {
      await redisClient.del("songs");
      console.log("Cache invalidated for songs");
    }

    res.status(201).json({
      message: "Thumbnail added",
      song: result[0],
    });
  },
);

export const deleteAlbum = asyncHandler(
  async (req: authenticatedRequest, res: Response) => {
    if (req.user?.role !== "admin") {
      throw new AppError("You are not admin", 401);
    }

    const { id } = req.params;

    const isAlbum = await sql`SELECT * FROM albums WHERE id = ${id}`;

    if (isAlbum.length === 0) {
      throw new AppError("No Album with this id", 404);
    }

    const public_id = getAssetPublicId(isAlbum[0]?.thumbnail, "albums");

    const { result } = await cloudinary.v2.uploader.destroy(public_id);

    if (result && result === "not found")
      throw new AppError("Asset in cloudinary not found", 404);

    await sql`DELETE FROM songs WHERE album_id = ${id}`;

    await sql`DELETE FROM albums WHERE id = ${id}`;

    if (redisClient.isReady) {
      await redisClient.del("albums");
      console.log("Cache invalidated for albums");
    }

    if (redisClient.isReady) {
      await redisClient.del("songs");
      console.log("Cache invalidated for songs");
    }

    res.status(200).json({
      message: "Album deleted successfully",
    });
  },
);

export const deleteSong = asyncHandler(
  async (req: authenticatedRequest, res: Response) => {
    if (req.user?.role !== "admin") {
      throw new AppError("You are not admin", 401);
    }

    const { id } = req.params;

    const isSong = await sql`SELECT * FROM songs WHERE id = ${id}`;

    if (isSong.length === 0) {
      throw new AppError("No song with this id", 404);
    }

    const public_id = getAssetPublicId(isSong[0]?.audio, "songs");

    const { result } = await cloudinary.v2.uploader.destroy(public_id, {
      resource_type: "video",
    });

    if (result && result === "not found")
      throw new AppError("Asset in cloudinary not found", 404);

    await sql`DELETE FROM songs WHERE id = ${id}`;

    if (redisClient.isReady) {
      await redisClient.del("songs");
      console.log("Cache invalidated for songs");
    }

    res.status(200).json({ message: "Song deleted Successfully" });
  },
);
