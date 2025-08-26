import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

export interface AuthRequest extends Request {
    userId?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
    const auth = req.headers.authorization; // "Bearer <token>"
    if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Token manquant" });

    const token = auth.split(" ")[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.userId = payload.userId;
        next();
    } catch {
        return res.status(401).json({ error: "Token invalide ou expiré" });
    }
}
