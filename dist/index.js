import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import adminRoutes from "./route.js";
import cloudinary from "cloudinary";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";
import { swaggerOptions } from "./libs/swagger.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { redisClient } from "./config/redis.js";
dotenv.config();
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
await redisClient.connect();
const app = express();
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
app.use(express.json());
async function initDB() {
    try {
        await sql `
    CREATE TABLE IF NOT EXISTS albums(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      thumbnail VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    )
    `;
        await sql `
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
    }
    catch (error) {
        console.log("Error initDb ", error);
    }
}
initDB();
app.use("/api/v1/admin", adminRoutes);
app.get("/", (req, res) => {
    res.send("Admin service is running");
});
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(7000, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map