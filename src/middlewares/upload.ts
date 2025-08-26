import multer from "multer";
import path from "path";
import fs from "fs";

const uploadRoot = path.join(__dirname, "../../uploads/images");
fs.mkdirSync(uploadRoot, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadRoot),
    filename: (_req, file, cb) => {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, unique + ext);
    },
});

function fileFilter(_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Type de fichier non supporté (image uniquement)"));
}

export const uploadImage = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo
});
