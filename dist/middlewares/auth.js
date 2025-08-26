"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";
function requireAuth(req, res, next) {
    const auth = req.headers.authorization; // "Bearer <token>"
    if (!(auth === null || auth === void 0 ? void 0 : auth.startsWith("Bearer ")))
        return res.status(401).json({ error: "Token manquant" });
    const token = auth.split(" ")[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        next();
    }
    catch (_a) {
        return res.status(401).json({ error: "Token invalide ou expiré" });
    }
}
//# sourceMappingURL=auth.js.map