import type { Request, Response } from "express";
export declare const getAllArticles: (_req: Request, res: Response) => Promise<void>;
export declare const getArticleById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createArticle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateArticle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteArticle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
