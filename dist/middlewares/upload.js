"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadRoot = path_1.default.join(__dirname, "../../uploads/images");
fs_1.default.mkdirSync(uploadRoot, { recursive: true });
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadRoot),
    filename: (_req, file, cb) => {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        cb(null, unique + ext);
    },
});
function fileFilter(_req, file, cb) {
    if (file.mimetype.startsWith("image/"))
        cb(null, true);
    else
        cb(new Error("Type de fichier non supporté (image uniquement)"));
}
exports.uploadImage = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo
});
//# sourceMappingURL=upload.js.map