import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key"; // ⚠️ Mets une vraie clé en prod

export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });

        res.status(201).json({ message: "Utilisateur créé", user: { id: user.id, email: user.email, name: user.name } });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ error: "Email ou mot de passe incorrect" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: "Email ou mot de passe incorrect" });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ message: "Connexion réussie", token });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
};
