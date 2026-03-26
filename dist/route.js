import express from "express";
import { isAuth } from "./middleware/authentication.js";
import { addAlbum, addSong } from "./controller.js";
import uploadFile from "./middleware/uploadFile.js";
const router = express.Router();
router.post("/album/new", isAuth, uploadFile, addAlbum);
router.post("/song/new", isAuth, uploadFile, addSong);
export default router;
//# sourceMappingURL=route.js.map