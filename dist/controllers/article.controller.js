"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.createArticle = exports.getArticleById = exports.getAllArticles = void 0;
const client_1 = require("@prisma/client");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const articleClient = prisma.article;
// GET /articles
const getAllArticles = async (_req, res) => {
    try {
        const allArticles = await articleClient.findMany();
        res.status(200).json({ data: allArticles });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erreur lors de la récupération des articles" });
    }
};
exports.getAllArticles = getAllArticles;
// GET /articles/:id
const getArticleById = async (req, res) => {
    try {
        const articleId = req.params.id;
        const article = await articleClient.findUnique({ where: { id: articleId } });
        if (!article)
            return res.status(404).json({ error: "Article introuvable" });
        res.status(200).json({ data: article });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erreur lors de la récupération de l'article" });
    }
};
exports.getArticleById = getArticleById;
// POST /articles  (multipart/form-data avec champ fichier "image")
const createArticle = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content)
            return res.status(400).json({ error: "title et content sont requis" });
        const file = req.file;
        const image = file ? `/uploads/images/${file.filename}` : "";
        const article = await articleClient.create({
            data: { title, content, image },
        });
        res.status(201).json({ data: article });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erreur lors de la création de l'article" });
    }
};
exports.createArticle = createArticle;
// PUT /articles/:id  (peut aussi recevoir un nouveau fichier "image")
const updateArticle = async (req, res) => {
    var _a;
    try {
        const articleId = req.params.id;
        const { title, content } = req.body;
        const file = req.file;
        const existing = await articleClient.findUnique({ where: { id: articleId } });
        if (!existing)
            return res.status(404).json({ error: "Article introuvable" });
        let image;
        if (file) {
            image = `/uploads/images/${file.filename}`;
            // suppression de l’ancienne image locale si elle existe
            if ((_a = existing.image) === null || _a === void 0 ? void 0 : _a.startsWith("/uploads/")) {
                const diskPath = path_1.default.join(__dirname, "../../", existing.image);
                fs_1.default.promises.unlink(diskPath).catch(() => { });
            }
        }
        const article = await articleClient.update({
            where: { id: articleId },
            data: Object.assign(Object.assign(Object.assign({}, (title ? { title } : {})), (content ? { content } : {})), (image ? { image } : {})),
        });
        res.status(200).json({ data: article });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'article" });
    }
};
exports.updateArticle = updateArticle;
// DELETE /articles/:id  (supprime aussi l'image locale si stockée)
const deleteArticle = async (req, res) => {
    var _a;
    try {
        const articleId = req.params.id;
        const existing = await articleClient.findUnique({ where: { id: articleId } });
        if (!existing)
            return res.status(404).json({ error: "Article introuvable" });
        await articleClient.delete({ where: { id: articleId } });
        if ((_a = existing.image) === null || _a === void 0 ? void 0 : _a.startsWith("/uploads/")) {
            const diskPath = path_1.default.join(__dirname, "../../", existing.image);
            fs_1.default.promises.unlink(diskPath).catch(() => { });
        }
        res.status(200).json({ data: {} });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erreur lors de la suppression de l'article" });
    }
};
exports.deleteArticle = deleteArticle;
//# sourceMappingURL=article.controller.js.map