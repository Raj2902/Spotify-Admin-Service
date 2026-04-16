import express from "express";
import { isAuth } from "./middleware/authentication.js";
import {
  addAlbum,
  addSong,
  addThumbnail,
  deleteAlbum,
  deleteSong,
} from "./controller.js";
import uploadFile from "./middleware/uploadFile.js";

const router = express.Router();

/**
 * @openapi
 * /api/v1/admin/album/new:
 *   post:
 *     tags:
 *       - Admin
 *     description: Create a new album.
 *     requestBody:
 *       description: Data needed to create a new album.
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/AlbumInput"
 *     responses:
 *       201:
 *         description: Returns the new album created with a success message of new album created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AlbumOutput'
 */
router.post("/album/new", isAuth, uploadFile, addAlbum);

/**
 * @openapi
 * /api/v1/admin/song/new:
 *   post:
 *     tags:
 *       - Admin
 *     description: Create a new song.
 *     requestBody:
 *       description: Data needed to create a new song.
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/SongInput"
 *     responses:
 *       201:
 *         description: Returns the new song created with a success message of new song created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SongOutput'
 */
router.post("/song/new", isAuth, uploadFile, addSong);

/**
 * @openapi
 * /api/v1/admin/album/new:
 *   post:
 *     tags:
 *       - Admin
 *     description: Create a new album.
 *     requestBody:
 *       description: Data needed to create a new album.
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/AlbumInput"
 *     responses:
 *       201:
 *         description: Returns the new album created with a success message of new album created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AlbumOutput'
 */
router.post("/album/new", isAuth, uploadFile, addAlbum);

/**
 * @openapi
 * /api/v1/admin/song/{id}:
 *   patch:
 *     tags:
 *       - Admin
 *     description: Add thumbnail image to a song.
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT Token (eg. <your-token>)
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Song id
 *     requestBody:
 *       description: File needed to add as a thumbnail to a new song.
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/SongThumbnailInput"
 *     responses:
 *       201:
 *         description: Adds thumbnail to the song.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SongOutput'
 */
router.patch("/song/:id", isAuth, uploadFile, addThumbnail);

/**
 * @openapi
 * /api/v1/admin/album/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     description: Delete a particular album as per the album id provided.
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT Token (eg. <your-token>)
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Album id
 *     responses:
 *       200:
 *         description: Provides with a message album deleted successfull if album deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteAlbumOutput'
 */
router.delete("/album/:id", isAuth, deleteAlbum);

/**
 * @openapi
 * /api/v1/admin/song/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     description: Delete a particular song as per the song id provided.
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT Token (eg. <your-token>)
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Song id
 *     responses:
 *       200:
 *         description: Provides with a message song deleted successfull if song deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteAlbumOutput'
 */
router.delete("/song/:id", isAuth, deleteSong);

export default router;
