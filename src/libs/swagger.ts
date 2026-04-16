import "dotenv/config";
import {
  albumInputSwaggerSchema,
  albumOuputSwaggerSchema,
  deleteAlbumSwaggerSchema,
} from "./swagger-schemas/album.swagger.schema.js";
import {
  songInputSwaggerSchema,
  songOutputSwaggerSchema,
} from "./swagger-schemas/song.swagger.schema.js";
import { SongThumbnailInputSwaggerSchema } from "./swagger-schemas/thumbnail.swagger.schema.js";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Music Playing Platform Admin APIs",
      version: "1.0.0",
      description: "List of all the music playing platform APIs for admin",
    },
    servers: [
      {
        url: "https://spotify-nginx.onrender.com",
        description: "Production server",
      },
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        AlbumInput: albumInputSwaggerSchema,
        AlbumOutput: albumOuputSwaggerSchema,
        SongInput: songInputSwaggerSchema,
        SongOutput: songOutputSwaggerSchema,
        SongThumbnailInput: SongThumbnailInputSwaggerSchema,
        DeleteAlbumOutput: deleteAlbumSwaggerSchema,
      },
    },
  },
  apis: ["./**/*.ts"], // Path to the API routes folders
};
