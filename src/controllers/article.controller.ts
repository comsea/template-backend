import { PrismaClient } from "@prisma/client";

const articleClient = new PrismaClient().article;

// getAllArticles
export const getAllArticles = async (req, res) => {
  try {
    const allArticles = await articleClient.findMany();
    res.status(200).json({ data: allArticles });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur lors de la récupération des articles" });
  }
};

// getArticleById
export const getArticleById = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await articleClient.findUnique({
      where: { id: articleId },
    });
    res.status(200).json({ data: article });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur lors de la récupération de l'article" });
  }
};

// createArticle
export const createArticle = async (req, res) => {
  try {
    const articleData = req.body;
    const article = await articleClient.create({ data: articleData });
    res.status(201).json({ data: article });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur lors de la création de l'article" });
  }
};

// updateArticle
export const updateArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const articleData = req.body;
    const article = await articleClient.update({
      where: { id: articleId },
      data: articleData,
    });
    res.status(200).json({ data: article });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'article" });
  }
};

// deleteArticle
export const deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    await articleClient.delete({
      where: { id: articleId },
    });
    res.status(200).json({ data: {} });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur lors de la suppression de l'article" });
  }
};
