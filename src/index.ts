import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import adminRoutes from "./route.js";
import cloudinary from "cloudinary";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.CLOUD_API_KEY as string,
  api_secret: process.env.CLOUD_API_SECRET as string,
});

const app = express();

app.use(express.json());

async function initDB() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS albums(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      thumbnail VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    )
    `;
    await sql`
    CREATE TABLE IF NOT EXISTS songs(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      thumbnail VARCHAR(255),
      audio VARCHAR(255) NOT NULL,
      album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    )
    `;

    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initDb ", error);
  }
}

app.use("/api/v1", adminRoutes);

app.use(errorHandler);

const PORT = process.env.PORT;

initDB().then(() => {
  app.listen(7000, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
