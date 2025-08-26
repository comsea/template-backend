import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();
const articleClient = prisma.article;

// GET /articles
export const getAllArticles = async (_req: Request, res: Response) => {
  try {
    const allArticles = await articleClient.findMany();
    res.status(200).json({ data: allArticles });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur lors de la récupération des articles" });
  }
};

// GET /articles/:id
export const getArticleById = async (req: Request, res: Response) => {
  try {
    const articleId = req.params.id;
    const article = await articleClient.findUnique({ where: { id: articleId } });
    if (!article) return res.status(404).json({ error: "Article introuvable" });
    res.status(200).json({ data: article });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur lors de la récupération de l'article" });
  }
};

// POST /articles  (multipart/form-data avec champ fichier "image")
export const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body as { title?: string; content?: string };
    if (!title || !content) return res.status(400).json({ error: "title et content sont requis" });

    const file = (req as any).file;
    const image = file ? `/uploads/images/${file.filename}` : "";

    const article = await articleClient.create({
      data: { title, content, image },
    });
    res.status(201).json({ data: article });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur lors de la création de l'article" });
  }
};

// PUT /articles/:id  (peut aussi recevoir un nouveau fichier "image")
export const updateArticle = async (req: Request, res: Response) => {
  try {
    const articleId = req.params.id;
    const { title, content } = req.body as { title?: string; content?: string };
    const file = (req as any).file as Express.Multer.File | undefined;

    const existing = await articleClient.findUnique({ where: { id: articleId } });
    if (!existing) return res.status(404).json({ error: "Article introuvable" });

    let image: string | undefined;
    if (file) {
      image = `/uploads/images/${file.filename}`;
      // suppression de l’ancienne image locale si elle existe
      if (existing.image?.startsWith("/uploads/")) {
        const diskPath = path.join(__dirname, "../../", existing.image);
        fs.promises.unlink(diskPath).catch(() => { });
      }
    }

    const article = await articleClient.update({
      where: { id: articleId },
      data: {
        ...(title ? { title } : {}),
        ...(content ? { content } : {}),
        ...(image ? { image } : {}),
      },
    });

    res.status(200).json({ data: article });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'article" });
  }
};

// DELETE /articles/:id  (supprime aussi l'image locale si stockée)
export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const articleId = req.params.id;

    const existing = await articleClient.findUnique({ where: { id: articleId } });
    if (!existing) return res.status(404).json({ error: "Article introuvable" });

    await articleClient.delete({ where: { id: articleId } });

    if (existing.image?.startsWith("/uploads/")) {
      const diskPath = path.join(__dirname, "../../", existing.image);
      fs.promises.unlink(diskPath).catch(() => { });
    }

    res.status(200).json({ data: {} });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur lors de la suppression de l'article" });
  }
};
