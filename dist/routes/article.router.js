"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const upload_1 = require("../middlewares/upload");
const article_controller_1 = require("../controllers/article.controller");
const articleRouter = (0, express_1.Router)();
const uploader = upload_1.uploadImage;
articleRouter.get("/", article_controller_1.getAllArticles);
articleRouter.get("/:id", article_controller_1.getArticleById);
// on attend un champ de fichier nommé "image" (multipart/form-data)
articleRouter.post("/", auth_1.requireAuth, upload_1.uploadImage.single("image"), article_controller_1.createArticle);
articleRouter.put("/:id", auth_1.requireAuth, upload_1.uploadImage.single("image"), article_controller_1.updateArticle);
articleRouter.delete("/:id", auth_1.requireAuth, article_controller_1.deleteArticle);
exports.default = articleRouter;
//# sourceMappingURL=article.router.js.map