"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key"; // ⚠️ Mets une vraie clé en prod
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email déjà utilisé" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });
        res.status(201).json({ message: "Utilisateur créé", user: { id: user.id, email: user.email, name: user.name } });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).json({ error: "Email ou mot de passe incorrect" });
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(400).json({ error: "Email ou mot de passe incorrect" });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ message: "Connexion réussie", token });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map