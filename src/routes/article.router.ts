import type { Multer } from "multer";
import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { uploadImage } from "../middlewares/upload";

import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller";


const articleRouter = Router();
const uploader = uploadImage as Multer;

articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getArticleById);

// on attend un champ de fichier nommé "image" (multipart/form-data)
articleRouter.post("/", requireAuth, (uploadImage as any).single("image"), createArticle);
articleRouter.put("/:id", requireAuth, (uploadImage as any).single("image"), updateArticle);
articleRouter.delete("/:id", requireAuth, deleteArticle);

export default articleRouter;
